import { HomeIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { FormProvider, useFieldArray, useForm } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { toast, useToasterStore } from '@redwoodjs/web/toast'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { PopoverMenu } from 'src/components/PopoverMenu/PopoverMenu'
import SetGroupCard from 'src/components/SetGroupCard'
import { WorkoutFormButtonGroup } from 'src/components/WorkoutFormButtonGroup/WorkoutFormButtonGroup'
import { ConfirmationToast } from 'src/utils/components/ConfirmationToast'
import { validateSetGroupOrder } from 'src/utils/functions/validateSetGroupOrder'
import { useSetGroupMutation } from 'src/utils/hooks/useSetGroupMutation'
import { useWorkoutMutation } from 'src/utils/hooks/useWorkoutMutation'
import { WorkoutFormType } from 'src/utils/types/WorkoutFormType'

/* Types */
type Props = {
  workout: WorkoutFormType
}

const WorkoutForm = ({ workout }: Props) => {
  /* Hooks */
  // Used for the drag and drop reordering
  const [flexContainerHeight, setFlexContainerHeight] = useState(undefined)
  const setGroupContainerRef = useRef(null)
  const setGroupCardRefs = useRef([])

  // Used to disable the buttons while toaster state is changing
  const { toasts } = useToasterStore()

  // Form
  const methods = useForm<WorkoutFormType>({
    defaultValues: workout,
  })

  const { control, getValues } = methods
  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: 'setGroups',
  })

  /* Mutations */
  // Set Group
  const setGroupMutation = useSetGroupMutation({
    onUpdateSuccess: ({ updateSetGroup }) => {
      const { order } = updateSetGroup
      // console.log(`SET GROUP ${order} UPDATED`)
      update(order, {
        ...getValues().setGroups[order],
        order,
      })
    },
    onDeleteSuccess: ({ deleteSetGroup }) => {
      // console.log('SET GROUP DELETED')
      remove(
        getValues().setGroups.findIndex(
          (setGroup) => setGroup.setGroupId === deleteSetGroup.id
        )
      )

      validateSetGroupOrder(getValues(), setGroupMutation)
    },
  })

  // Workout
  const workoutMutation = useWorkoutMutation({
    onDeleteSuccess: ({ deleteWorkout }) => {
      console.log('WORKOUT DELETED', deleteWorkout)
      navigate(routes.home())
    },
  })

  /**
   * It deletes a set group and all of its sets
   * Deletion of sets is handled by cascading delete setting
   * @param setGroupIndex - The index of the set group to delete
   */
  const deleteSetGroup = (setGroupIndex: number) => {
    const setGroupToDelete = getValues().setGroups[setGroupIndex]
    setGroupMutation.deleteSetGroup.mutation({
      variables: {
        id: setGroupToDelete.setGroupId,
      },
    })
  }

  const handleDeleteWorkout = () => {
    // console.log('HANDLE DELETE WORKOUT')
    const isEmptyWorkout =
      getValues().setGroups.length === 0 ||
      (getValues().setGroups.length < 2 &&
        getValues().setGroups[0].sets.length < 2 &&
        getValues().setGroups[0].sets[0].done === false)

    if (isEmptyWorkout) {
      deleteWorkout()
    } else {
      toast(
        (t) => (
          <ConfirmationToast
            t={t}
            actionEvent={deleteWorkout}
            actionEventLabel="Delete"
            text="Do you want to delete the workout? This action cannot be undone."
          />
        ),
        {
          id: 'handleDeleteWorkout',
          position: 'bottom-center',
          duration: 10000,
          icon: <></>,
        }
      )
    }
  }

  const deleteWorkout = () => {
    toast.dismiss('handleDeleteWorkout')
    console.log('DELETE WORKOUT')
    // Delete the workout
    workoutMutation.deleteWorkout.mutation({
      variables: {
        id: workout.workoutId,
      },
    })
  }

  /* Handle the drag and drop reordering */
  const handleDragEnd = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index)
      // Check if the order of the set groups in the database
      // is the same as the order of the set groups
      validateSetGroupOrder(getValues(), setGroupMutation)
    }
    // Reset the flex container height
    setFlexContainerHeight(undefined)
  }

  // Executed in handleBeforeCapture because it needs to be executed before the drag starts
  const handleBeforeCapture = async ({ draggableId }) => {
    if (!draggableId) {
      setFlexContainerHeight(undefined)
    }

    const index = fields.findIndex((f) => f.id === draggableId)
    const top = setGroupContainerRef.current.getBoundingClientRect().top
    const bottom = setGroupCardRefs.current[index].getBoundingClientRect().top

    // Expand the invisible container so that the grabbed item
    // Is set still in it's place while the other exercises are moving
    // 12 = gap-3 , 40 = h-10 + p-2
    // 12 because the gap-3 between the set groups
    // 48 * the number of exercises above the grabbed exercise,
    // because the height of the shrunk set group is 48
    setFlexContainerHeight(bottom - top - 12 - 48 * index)
  }

  const popoverMenuActions = [
    {
      label: 'Add a Note',
      onClick: () => {},
      icon: <PencilIcon />,
      disabled: true,
    },
    {
      label: 'Return to homepage',
      onClick: () => navigate(routes.home()),
      icon: <HomeIcon />,
    },
    {
      label: 'Delete Workout',
      onClick: handleDeleteWorkout,
      icon: <XMarkIcon />,
      disabled: toasts.length > 0,
    },
  ]

  /* Render */
  return (
    <>
      <div className="popover-wrapper mt-4 mb-4 flex h-full">
        <PopoverMenu actions={popoverMenuActions}>
          <h1 className="bg-gray-200 px-2 py-1 text-xl font-medium tracking-wide text-gray-900">
            {workout.name}
          </h1>
        </PopoverMenu>
      </div>
      <div ref={setGroupContainerRef} className="flex flex-grow flex-col">
        <FormProvider {...methods}>
          <form onSubmit={() => null} className="flex flex-grow flex-col">
            <DragDropContext
              onBeforeCapture={handleBeforeCapture}
              onDragEnd={handleDragEnd}
            >
              <div className="flex flex-grow flex-col justify-between">
                <section className="flex flex-col gap-3">
                  {/* Dynamic invisible flex container */}
                  <div
                    className="w-full"
                    style={{ height: flexContainerHeight ?? 0 }}
                  ></div>
                  <Droppable droppableId="setGroups">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={clsx('transition-all duration-100', {
                          'space-y-8': flexContainerHeight === undefined,
                          'space-y-0': flexContainerHeight !== undefined,
                        })}
                      >
                        {/* Loop over all set groups */}
                        {fields.map((item, setGroupIndex) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={setGroupIndex}
                            // Disable reordering if there is only one set group
                            isDragDisabled={fields.length < 2}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <div
                                  ref={(el) =>
                                    (setGroupCardRefs.current[setGroupIndex] =
                                      el)
                                  }
                                >
                                  <SetGroupCard
                                    {...item}
                                    setGroupIndex={setGroupIndex}
                                    handleDelete={deleteSetGroup}
                                    dragHandleProps={provided.dragHandleProps}
                                    isReordering={
                                      flexContainerHeight !== undefined
                                    }
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </section>

                <WorkoutFormButtonGroup
                  workout={workout}
                  getValues={getValues}
                  append={append}
                  update={update}
                  fields={fields}
                  disabled={toasts.length > 0}
                />
              </div>
            </DragDropContext>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default WorkoutForm

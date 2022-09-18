import { FormProvider, useFieldArray, useForm } from '@redwoodjs/forms'
import { useSetMutation } from 'src/utils/hooks/useSetMutation'
import { defaultSet } from 'src/components/SetGroup'
import { useSetGroupMutation } from 'src/utils/hooks/useSetGroupMutation'
import { remapLatestSetGroup, remapSet } from '../WorkoutCell'
import { WorkoutFormType } from 'src/utils/types/WorkoutFormType'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SetGroupCard from 'src/utils/components/SetGroupCard'
import { useRef, useState } from 'react'
import clsx from 'clsx'

const defaultSetGroup = {
  exerciseId: 1,
}
type Props = {
  workout: WorkoutFormType
}

const WorkoutForm = ({ workout }: Props) => {
  // Used for the drag and drop reordering
  const [flexContainerHeight, setFlexContainerHeight] = useState(undefined)
  const setGroupContainerRef = useRef(null)
  const setGroupCardRefs = useRef([])

  // Form
  const methods = useForm<WorkoutFormType>({
    defaultValues: workout,
  })

  const { control, getValues } = methods
  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: 'setGroups',
  })

  const setMutation = useSetMutation({
    // Triggered after the createSetGroupMutation is done
    // Add the new set to the setGroup that was just created
    onCreationSuccess: ({ createSet }) => {
      // Get the index of the setGroup that was just created
      const setGroupIndex = getValues().setGroups.findIndex(
        (field) => field.setGroupId === createSet.setGroupId
      )
      // Update the setGroup add the new set to the list of sets
      update(setGroupIndex, {
        ...getValues().setGroups[setGroupIndex],
        sets: [remapSet(createSet)],
      })
    },

    onDeleteSuccess: ({ deleteSet }) => {
      // Get the index of the deleted set and the related setGroup
      const setGroupIndex = getValues().setGroups.findIndex((setGroup) =>
        setGroup.sets.some((set) => set.setId === deleteSet.id)
      )
      const setIndex = getValues().setGroups[setGroupIndex].sets.findIndex(
        (set) => set.setId === deleteSet.id
      )

      // Check if this set is the last in the set group
      // Only the can we delete the entire setGroup
      if (setIndex === getValues().setGroups[setGroupIndex].sets.length - 1) {
        setGroupMutation.deleteSetGroup.mutation({
          variables: {
            id: getValues().setGroups[setGroupIndex].setGroupId,
          },
        })
      }
    },
  })

  const setGroupMutation = useSetGroupMutation({
    onCreationSuccess: ({ createSetGroup }) => {
      console.log('SET GROUP CREATED')
      setMutation.createSet.mutation({
        variables: {
          input: {
            ...defaultSet,
            setGroupId: createSetGroup.id,
          },
        },
      })
      append({
        setGroupId: createSetGroup.id,
        order: createSetGroup.order,
        exercise: {
          exerciseId: createSetGroup.exercise.id,
          name: createSetGroup.exercise.name,
          latestSetGroup: remapLatestSetGroup(
            createSetGroup.exercise.latestSetGroup
          ),
        },
        sets: [],
      })
    },
    onDeleteSuccess: ({ deleteSetGroup }) => {
      console.log('SET GROUP DELETED')
      remove(
        getValues().setGroups.findIndex(
          (setGroup) => setGroup.setGroupId === deleteSetGroup.id
        )
      )
      checkSetGroupOrder()
    },
    onUpdateSuccess: ({ updateSetGroup }) => {
      const { order } = updateSetGroup
      console.log(`SET GROUP ${order} UPDATED`)
      update(order, {
        ...getValues().setGroups[order],
        order,
      })
    },
  })

  //TODO: Make this dynamic, user must have selected an exercise before calling this function
  const handleAppend = () => {
    setGroupMutation.createSetGroup.mutation({
      variables: {
        input: {
          exerciseId: defaultSetGroup.exerciseId,
          order: fields.length,
          workoutId: workout.workoutId,
        },
      },
    })
  }

  /**
   * It deletes a set group and all of its sets
   * @param setGroupIndex - The index of the set group to delete
   */
  const handleDelete = (setGroupIndex) => {
    const setGroupToDelete = getValues().setGroups[setGroupIndex]
    // Delete all sets in the set group
    if (setGroupToDelete.sets.length > 0) {
      setGroupToDelete.sets.forEach((set) => {
        setMutation.deleteSet.mutation({
          variables: {
            id: set.setId,
          },
        })
      })
    } else {
      // If there are no sets in the set group, delete the set group
      setGroupMutation.deleteSetGroup.mutation({
        variables: {
          id: setGroupToDelete.setGroupId,
        },
      })
    }
  }

  /**
   * It checks if the order of the set groups in the database is the same as the order of the set groups
   * in the state. If it's not, it updates the order of the set groups in the database
   */
  const checkSetGroupOrder = () => {
    getValues().setGroups.forEach((setGroup, index) => {
      if (setGroup.order !== index) {
        setGroupMutation.updateSetGroup.mutation({
          variables: {
            id: setGroup.setGroupId,
            input: {
              order: index,
            },
          },
        })
      }
    })
  }

  // Handle the drag and drop reordering
  const handleDragEnd = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index)
      // Check if the order of the set groups in the database
      // is the same as the order of the set groups
      checkSetGroupOrder()
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

  return (
    <div ref={setGroupContainerRef}>
      <FormProvider {...methods}>
        <form onSubmit={() => null}>
          <DragDropContext
            onBeforeCapture={handleBeforeCapture}
            onDragEnd={handleDragEnd}
          >
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
                                (setGroupCardRefs.current[setGroupIndex] = el)
                              }
                            >
                              <SetGroupCard
                                {...item}
                                setGroupIndex={setGroupIndex}
                                handleDelete={handleDelete}
                                dragHandleProps={provided.dragHandleProps}
                                isReordering={flexContainerHeight !== undefined}
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
              <button
                type="button"
                className="w-full h-8 p-1 mt-2 font-medium tracking-wide text-gray-900 transition-colors bg-gray-200 rounded-sm text-md hover:bg-gray-300 active:bg-gray-300"
                onClick={handleAppend}
              >
                + Add Exercise
              </button>
            </section>
          </DragDropContext>
        </form>
      </FormProvider>
    </div>
  )
}

export default WorkoutForm

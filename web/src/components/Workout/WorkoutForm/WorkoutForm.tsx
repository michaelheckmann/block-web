import { FormProvider, useFieldArray, useForm } from '@redwoodjs/forms'
import { useSetMutation } from 'src/utils/hooks/useSetMutation'
import { defaultSet } from 'src/components/SetGroup'
import { useSetGroupMutation } from 'src/utils/hooks/useSetGroupMutation'
import { remapLatestSetGroup, remapSet } from '../WorkoutCell'
import { WorkoutFormType } from 'src/utils/types/WorkoutFormType'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SetGroupCard from 'src/utils/components/SetGroupCard'
import { useRef, useState } from 'react'

const defaultSetGroup = {
  exerciseId: 1,
}
type Props = {
  workout: WorkoutFormType
}

const WorkoutForm = ({ workout }: Props) => {
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

  const handleDragEnd = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index)
      checkSetGroupOrder()
    }
    setFlexContainerHeight(undefined)
  }

  const handleDragStart = ({ source }) => {
    source.index
  }

  const [flexContainerHeight, setFlexContainerHeight] = useState(undefined)
  const setGroupContainerRef = useRef(null)
  const setGroupCardRefs = useRef([])

  const handleBeforeCapture = async ({ draggableId }) => {
    if (!draggableId) {
      setFlexContainerHeight(undefined)
    }

    const index = fields.findIndex((f) => f.id === draggableId)
    const top = setGroupContainerRef.current.getBoundingClientRect().top
    const bottom = setGroupCardRefs.current[index].getBoundingClientRect().top
    setFlexContainerHeight(bottom - top - 12 - 48 * index) // 12 = gap-3 , 40 = h-8 + p-2
  }

  return (
    <div ref={setGroupContainerRef}>
      <FormProvider {...methods}>
        <form onSubmit={() => null}>
          <DragDropContext
            onBeforeCapture={handleBeforeCapture}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <section className="flex flex-col gap-3">
              <div
                className="w-full"
                style={{ height: flexContainerHeight ?? 0 }}
              ></div>
              <Droppable droppableId="setGroups">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {fields.map((item, setGroupIndex) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={setGroupIndex}
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
                className="rounded bg-green-300 p-2 font-semibold"
                onClick={handleAppend}
              >
                Add
              </button>
            </section>
          </DragDropContext>
        </form>
      </FormProvider>
    </div>
  )
}

export default WorkoutForm

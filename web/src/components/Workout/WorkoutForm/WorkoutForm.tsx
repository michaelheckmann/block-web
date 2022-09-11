import { FormProvider, useFieldArray, useForm } from '@redwoodjs/forms'
import { useSetMutation } from 'src/utils/hooks/useSetMutation'
import SetGroup, { defaultSet } from 'src/components/SetGroup'
import { useSetGroupMutation } from 'src/utils/hooks/useSetGroupMutation'
import { remapLatestSetGroup, remapSet } from '../WorkoutCell'
import { WorkoutFormType } from 'src/utils/types/WorkoutFormType'

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
  const { fields, append, remove, update } = useFieldArray({
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
    },
  })

  //TODO: Make this dynamic, user must have selected an exercise before calling this function
  const handleAppend = () => {
    setGroupMutation.createSetGroup.mutation({
      variables: {
        input: {
          exerciseId: defaultSetGroup.exerciseId,
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

  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={() => null}>
          <section className="flex flex-col gap-3">
            {fields.map((item, setGroupIndex) => (
              <div key={item.id} className="flex flex-col">
                {item.id}
                <SetGroup {...item} setGroupIndex={setGroupIndex} />
                <button
                  type="button"
                  className="p-1 font-semibold bg-red-300 rounded"
                  onClick={() => handleDelete(setGroupIndex)}
                >
                  Delete
                </button>
              </div>
            ))}

            <button
              type="button"
              className="p-2 font-semibold bg-green-300 rounded"
              onClick={handleAppend}
            >
              Add
            </button>
          </section>
        </form>
      </FormProvider>
    </div>
  )
}

export default WorkoutForm

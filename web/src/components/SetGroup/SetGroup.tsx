import { useFieldArray, useFormContext } from '@redwoodjs/forms'
import Set from 'src/components/Set'
import { Header } from 'src/components/SetGroupUtils/Header'
import { Placeholder } from 'src/components/SetGroupUtils/Placeholder'
import SetWrapper from 'src/components/SetWrapper/SetWrapper'
import { useSetMutation } from 'src/utils/hooks/useSetMutation'
import {
  LatestSetGroupType,
  SetGroupProps,
  WorkoutFormType,
} from 'src/utils/types/WorkoutFormType'

/* Default Values */
export const defaultSet = {
  done: false,
  weight: undefined,
  reps: undefined,
}

const fallbackPreviousValues = {
  weight: undefined,
  reps: undefined,
}

/* Functions */
function getPreviousValues({
  latestSetGroupValues,
  setIndex,
}: {
  latestSetGroupValues: LatestSetGroupType
  setIndex: number
}) {
  if (!latestSetGroupValues) {
    return fallbackPreviousValues
  }

  // If there are no previous sets for this set number, return undefined
  if (setIndex > latestSetGroupValues.sets.length - 1) {
    return fallbackPreviousValues
  }

  const previousSet = latestSetGroupValues.sets[setIndex]
  return {
    weight: previousSet.weight,
    reps: previousSet.reps,
  }
}

/* Component */
const SetGroup = ({ exercise, setGroupIndex }: SetGroupProps) => {
  /* Hooks */
  const { control, getValues } = useFormContext<WorkoutFormType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `setGroups.${setGroupIndex}.sets` as 'setGroups.0.sets',
  })

  /* Mutations */
  const setMutation = useSetMutation({
    onCreationSuccess: ({ createSet }) => {
      // console.log('SET CREATED')
      append({
        setId: createSet.id,
        weight: createSet.weight,
        reps: createSet.reps,
        done: createSet.done,
      })
    },
    onDeleteSuccess: ({ deleteSet }) => {
      // console.log('SET DELETED')
      remove(
        getValues().setGroups[setGroupIndex].sets.findIndex(
          (set) => set.setId === deleteSet.id
        )
      )
    },
  })

  const appendSet = () => {
    setMutation.createSet.mutation({
      variables: {
        input: {
          ...defaultSet,
          setGroupId: getValues().setGroups[setGroupIndex].setGroupId,
        },
      },
    })
  }

  const deleteSet = (setIndex) => {
    setMutation.deleteSet.mutation({
      variables: {
        id: getValues().setGroups[setGroupIndex].sets[setIndex].setId,
      },
    })
  }

  /* Render */
  return (
    <>
      <Header />

      {/* Main Set Content */}

      <div className="mb-2 space-y-2">
        {fields.length === 0 && <Placeholder />}
        {fields.map((item, setIndex) => (
          <SetWrapper
            key={item.id}
            onDelete={() => {
              deleteSet(setIndex)
            }}
          >
            <Set
              {...item}
              previous={getPreviousValues({
                latestSetGroupValues: exercise.latestSetGroup,
                setIndex,
              })}
              setGroupIndex={setGroupIndex}
              setIndex={setIndex}
              handleDelete={() => deleteSet(setIndex)}
            />
          </SetWrapper>
        ))}
      </div>

      <button
        type="button"
        className="h-8 w-full rounded-sm bg-gray-200 p-1 font-medium tracking-wide text-gray-900 transition-colors hover:bg-gray-300 active:bg-gray-300"
        onClick={appendSet}
      >
        + Add Set
      </button>
    </>
  )
}

export default SetGroup

import { useFormContext, useFieldArray } from '@redwoodjs/forms'
import Set from 'src/components/Set/Set'
import SetWrapper from 'src/components/micro/SetWrapper'
import ActionMenu from 'src/components/micro/ActionMenu'
import ExerciseModal from 'src/components/micro/ExerciseModal'
import { useSetMutation } from 'src/utils/hooks/useSetMutation'
import {
  SetGroupType,
  WorkoutFormType,
  LatestSetGroupType,
} from 'src/utils/types/WorkoutFormType'

export type SetGroupProps = SetGroupType & {
  setGroupIndex: number
}

export const defaultSet = {
  done: false,
  weight: undefined,
  reps: undefined,
}

const fallbackPreviousValues = {
  weight: undefined,
  reps: undefined,
}

const SetGroup = ({ exercise, setGroupIndex }: SetGroupProps) => {
  const { control, getValues } = useFormContext<WorkoutFormType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `setGroups.${setGroupIndex}.sets` as 'setGroups.0.sets',
  })

  const setMutation = useSetMutation({
    onCreationSuccess: ({ createSet }) => {
      console.log('SET CREATED')
      append({
        setId: createSet.id,
        weight: createSet.weight,
        reps: createSet.reps,
        done: createSet.done,
      })
    },
    onDeleteSuccess: ({ deleteSet }) => {
      console.log('SET DELETED')
      remove(
        getValues().setGroups[setGroupIndex].sets.findIndex(
          (set) => set.setId === deleteSet.id
        )
      )
    },
  })

  const handleAppend = () => {
    setMutation.createSet.mutation({
      variables: {
        input: {
          ...defaultSet,
          setGroupId: getValues().setGroups[setGroupIndex].setGroupId,
        },
      },
    })
  }

  const handleDelete = (setIndex) => {
    setMutation.deleteSet.mutation({
      variables: {
        id: getValues().setGroups[setGroupIndex].sets[setIndex].setId,
      },
    })
  }

  return (
    <div className="flex flex-col p-2 text-sm font-medium transition-all">
      {/* Exercise Menu Bar */}
      <div className="mb-2 flex items-stretch justify-between gap-3 font-semibold text-primary">
        <div className="flex">
          <ExerciseModal exercise={exercise} />
        </div>
        <div className="flex">
          <ActionMenu />
        </div>
      </div>

      <Header />

      {/* Main Set Content */}
      {fields.length === 0 && <Placeholder />}
      {fields.map((item, setIndex) => (
        <SetWrapper
          key={item.id}
          onDelete={() => {
            handleDelete(setIndex)
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
          />
        </SetWrapper>
      ))}

      <button
        type="button"
        className="rounded bg-gray-200 p-1 font-medium transition-colors hover:bg-gray-300 active:bg-gray-300"
        onClick={handleAppend}
      >
        + Add Set
      </button>
    </div>
  )
}

const Header = () => (
  <div className="flex w-full justify-between gap-3 px-2 text-center">
    <div className="w-5">Set</div>
    <div className="flex-grow">Previous</div>
    <div className="w-12">KG</div>
    <div className="w-12">Reps</div>
    <div className="w-7">✓</div>
  </div>
)

const Placeholder = () => (
  <div className="flex w-full animate-pulse items-center justify-center gap-3 p-2">
    <div className="w-5">
      <div className="h-1 w-full rounded-full bg-gray-200"></div>
    </div>
    <div className="flex-grow">
      <div className="h-1 w-full rounded-full bg-gray-200"></div>
    </div>
    <div className="w-12">
      <div className="h-1 w-full rounded-full bg-gray-200"></div>
    </div>
    <div className="w-12">
      <div className="h-1 w-full rounded-full bg-gray-200"></div>
    </div>
    <div className="w-7">
      <div className="h-1 w-full rounded-full bg-gray-200"></div>
    </div>
  </div>
)

export default SetGroup

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

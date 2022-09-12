import {
  PencilIcon,
  ArrowPathIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useFormContext, useFieldArray } from '@redwoodjs/forms'
import Set from 'src/components/Set/Set'
import SetWrapper from 'src/utils/components/SetWrapper'
import { useSetMutation } from 'src/utils/hooks/useSetMutation'
import {
  SetGroupType,
  WorkoutFormType,
  LatestSetGroupType,
} from 'src/utils/types/WorkoutFormType'
import PopoverMenu from '../PopoverMenu/PopoverMenu'

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
      <div className="flex items-stretch justify-between gap-3 mb-2 font-semibold text-primary">
        <div className="flex">
          {/* TODO: Add the modal */}
          {exercise.name}
        </div>
        <div className="flex">
          <PopoverMenu
            actions={[
              {
                label: 'Add a Note',
                onClick: () => {},
                icon: <PencilIcon />,
              },
              {
                label: 'Replace Exercise',
                onClick: () => {},
                icon: <ArrowPathIcon />,
              },
              {
                label: 'Remove Exercise',
                onClick: () => {},
                icon: <XMarkIcon />,
                disabled: true,
              },
            ]}
          >
            <div className="flex h-full cursor-pointer flex-col items-center justify-center gap-[2px] rounded bg-primary-100 px-3 transition hover:bg-primary-200">
              <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-primary"></div>
              <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-primary"></div>
              <div className="flex h-[2.5px] w-[2.5px] items-center justify-center rounded-full bg-primary"></div>
            </div>
          </PopoverMenu>
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
        className="p-1 font-medium transition-colors bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-300"
        onClick={handleAppend}
      >
        + Add Set
      </button>
    </div>
  )
}

const Header = () => (
  <div className="flex justify-between w-full gap-3 px-2 text-center">
    <div className="w-5">Set</div>
    <div className="flex-grow">Previous</div>
    <div className="w-12">KG</div>
    <div className="w-12">Reps</div>
    <div className="w-7">✓</div>
  </div>
)

const Placeholder = () => (
  <div className="flex items-center justify-center w-full gap-3 p-2 animate-pulse">
    <div className="w-5">
      <div className="w-full h-1 bg-gray-200 rounded-full"></div>
    </div>
    <div className="flex-grow">
      <div className="w-full h-1 bg-gray-200 rounded-full"></div>
    </div>
    <div className="w-12">
      <div className="w-full h-1 bg-gray-200 rounded-full"></div>
    </div>
    <div className="w-12">
      <div className="w-full h-1 bg-gray-200 rounded-full"></div>
    </div>
    <div className="w-7">
      <div className="w-full h-1 bg-gray-200 rounded-full"></div>
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

import { useFormContext, useFieldArray } from '@redwoodjs/forms'
import Set, { SetType } from 'src/components/Set/Set'
import { FormType } from 'src/pages/HomePage/HomePage'
import SetWrapper from 'src/components/micro/SetWrapper'
import ActionMenu from '../micro/ActionMenu'
import ExerciseModal from '../micro/ExerciseModal'

export type SetGroupType = {
  exercise: string
  sets: SetType[]
}
interface Props extends SetGroupType {
  setGroupIndex: number
}

const defaultSet = {
  previous: { weight: undefined, reps: undefined },
  done: false,
  weight: undefined,
  reps: undefined,
}

const SetGroup = ({ exercise, setGroupIndex }: Props) => {
  const { control } = useFormContext<FormType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `setGroups.${setGroupIndex}.sets` as 'setGroups.0.sets',
  })

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
            remove(setIndex)
          }}
        >
          <Set {...item} setGroupIndex={setGroupIndex} setIndex={setIndex} />
        </SetWrapper>
      ))}

      <button
        type="button"
        className="rounded bg-gray-200 p-1 font-medium transition-colors hover:bg-gray-300 active:bg-gray-300"
        onClick={() => append(defaultSet)}
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

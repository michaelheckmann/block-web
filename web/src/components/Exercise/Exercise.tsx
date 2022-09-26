import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import ExerciseHistory from 'src/components/ExerciseHistory/ExerciseHistory'
import { FindExerciseQuery } from 'types/graphql'

/* Variables */
const TABS = ['Details', 'History']

/* Types */
export type ExerciseProps = {
  exercise: FindExerciseQuery['exercise']
}

/* Component */
const Exercise = ({ exercise }: ExerciseProps) => {
  return (
    <div className="text-gray-900">
      <div className="mb-4">
        <h2 className="flex w-full font-medium tracking-wide">
          {exercise.name}
        </h2>
      </div>
      <Tab.Group defaultIndex={1}>
        <Tab.List className="flex gap-3 mb-2 justify-evenly">
          {TABS.map((tab) => (
            <Tab key={tab} className="w-full">
              {({ selected }) => (
                <div
                  className={clsx(
                    'w-full rounded-sm bg-gray-200 text-sm font-medium tracking-wide ring-gray-700 transition-all duration-200 hover:bg-gray-300',
                    {
                      'ring-2': selected,
                      'ring-0': !selected,
                    }
                  )}
                >
                  {tab}
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>
            <ExerciseHistory exercise={exercise} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Exercise

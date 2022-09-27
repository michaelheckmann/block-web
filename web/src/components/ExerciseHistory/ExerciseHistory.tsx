import clsx from 'clsx'
import { ExerciseProps } from 'src/components/Exercise/Exercise'
import { formatTimestamp } from 'src/utils/functions/formatTimestamp'
import { timeSince } from '../../utils/functions/timeSince'

function ExerciseHistory({ exercise }: ExerciseProps) {
  const sortedSetGroups = [...exercise.setGroups].sort((a, b) => {
    const aCreatedAt = new Date(a.workout.createdAt)
    const bCreatedAt = new Date(b.workout.createdAt)
    return bCreatedAt.getTime() - aCreatedAt.getTime()
  })

  return (
    <div className="flex flex-col gap-4">
      {sortedSetGroups.map((setGroup) => (
        <div key={setGroup.id} className="rounded border-1 border-gray-300">
          {/* Card Header */}
          <div className="border-b-1 border-gray-300 p-2">
            <div className="flex w-full justify-between text-gray-700">
              <p>
                {formatTimestamp(setGroup.workout.createdAt, false)} (
                {timeSince(setGroup.workout.createdAt, new Date())} ago)
              </p>
            </div>
          </div>

          {/* Card Body */}
          <div className="flex flex-col gap-1 p-3">
            {setGroup.workout.setGroups.map((workoutSetGroup) => {
              const isCurrentSetGroup = workoutSetGroup.id === setGroup.id
              const workoutSetGroupLength = workoutSetGroup.sets.length
              return (
                <div key={workoutSetGroup.id} className="flex flex-col gap-1">
                  <div
                    className={clsx(
                      'flex justify-between text-sm text-gray-500',
                      {
                        'font-medium': isCurrentSetGroup,
                        'font-normal': !isCurrentSetGroup,
                      }
                    )}
                  >
                    <p>{workoutSetGroup.exercise.name}</p>

                    {isCurrentSetGroup ? (
                      <div className="flex flex-col text-gray-900">
                        {setGroup.sets.map((set) => (
                          <div key={set.id}>
                            <p className="font-medium">{`${set.weight} kg x ${set.reps}`}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>
                        {workoutSetGroupLength}{' '}
                        {workoutSetGroupLength < 2 ? 'set' : 'sets'}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExerciseHistory

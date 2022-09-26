import clsx from 'clsx'
import { ExerciseProps } from 'src/components/Exercise/Exercise'
import { formatTimestamp } from 'src/utils/functions/formatTimestamp'
import { timeSince } from '../../utils/functions/timeSince'

function ExerciseHistory({ exercise }: ExerciseProps) {
  return (
    <div className="flex flex-col gap-4">
      {exercise.setGroups.map((setGroup) => (
        <div key={setGroup.id} className="border-gray-300 rounded border-1">
          {/* Card Header */}
          <div className="p-2 border-gray-300 border-b-1">
            <div className="flex justify-between w-full text-gray-700">
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

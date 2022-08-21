import {
  workouts,
  workout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from './workouts'
import type { StandardScenario } from './workouts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('workouts', () => {
  scenario('returns all workouts', async (scenario: StandardScenario) => {
    const result = await workouts()

    expect(result.length).toEqual(Object.keys(scenario.workout).length)
  })

  scenario('returns a single workout', async (scenario: StandardScenario) => {
    const result = await workout({ id: scenario.workout.one.id })

    expect(result).toEqual(scenario.workout.one)
  })

  scenario('creates a workout', async () => {
    const result = await createWorkout({
      input: { name: 'String', done: true },
    })

    expect(result.name).toEqual('String')
    expect(result.done).toEqual(true)
  })

  scenario('updates a workout', async (scenario: StandardScenario) => {
    const original = await workout({ id: scenario.workout.one.id })
    const result = await updateWorkout({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a workout', async (scenario: StandardScenario) => {
    const original = await deleteWorkout({ id: scenario.workout.one.id })
    const result = await workout({ id: original.id })

    expect(result).toEqual(null)
  })
})

import {
  exercises,
  exercise,
  createExercise,
  updateExercise,
  deleteExercise,
} from './exercises'
import type { StandardScenario } from './exercises.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('exercises', () => {
  scenario('returns all exercises', async (scenario: StandardScenario) => {
    const result = await exercises()

    expect(result.length).toEqual(Object.keys(scenario.exercise).length)
  })

  scenario('returns a single exercise', async (scenario: StandardScenario) => {
    const result = await exercise({ id: scenario.exercise.one.id })

    expect(result).toEqual(scenario.exercise.one)
  })

  scenario('creates a exercise', async () => {
    const result = await createExercise({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a exercise', async (scenario: StandardScenario) => {
    const original = await exercise({ id: scenario.exercise.one.id })
    const result = await updateExercise({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a exercise', async (scenario: StandardScenario) => {
    const original = await deleteExercise({ id: scenario.exercise.one.id })
    const result = await exercise({ id: original.id })

    expect(result).toEqual(null)
  })
})

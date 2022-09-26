import {
  createSetGroup,
  deleteSetGroup,
  setGroup,
  setGroups,
  updateSetGroup,
} from './setGroups'
import type { StandardScenario } from './setGroups.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('setGroups', () => {
  scenario('returns all setGroups', async (scenario: StandardScenario) => {
    const result = await setGroups()

    expect(result.length).toEqual(Object.keys(scenario.setGroup).length)
  })

  scenario('returns a single setGroup', async (scenario: StandardScenario) => {
    const result = await setGroup({ id: scenario.setGroup.one.id })

    expect(result).toEqual(scenario.setGroup.one)
  })

  scenario('creates a setGroup', async (scenario: StandardScenario) => {
    const result = await createSetGroup({
      input: {
        exerciseId: scenario.setGroup.two.exerciseId,
        workoutId: scenario.setGroup.two.workoutId,
        order: scenario.setGroup.two.order,
      },
    })

    expect(result.exerciseId).toEqual(scenario.setGroup.two.exerciseId)
    expect(result.workoutId).toEqual(scenario.setGroup.two.workoutId)
  })

  scenario('updates a setGroup', async (scenario: StandardScenario) => {
    const original = await setGroup({ id: scenario.setGroup.one.id })
    const result = await updateSetGroup({
      id: original.id,
      input: { exerciseId: scenario.setGroup.two.exerciseId },
    })

    expect(result.exerciseId).toEqual(scenario.setGroup.two.exerciseId)
  })

  scenario('deletes a setGroup', async (scenario: StandardScenario) => {
    const original = await deleteSetGroup({ id: scenario.setGroup.one.id })
    const result = await setGroup({ id: original.id })

    expect(result).toEqual(null)
  })
})

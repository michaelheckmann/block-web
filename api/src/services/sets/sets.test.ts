import { sets, set, createSet, updateSet, deleteSet } from './sets'
import type { StandardScenario } from './sets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('sets', () => {
  scenario('returns all sets', async (scenario: StandardScenario) => {
    const result = await sets()

    expect(result.length).toEqual(Object.keys(scenario.set).length)
  })

  scenario('returns a single set', async (scenario: StandardScenario) => {
    const result = await set({ id: scenario.set.one.id })

    expect(result).toEqual(scenario.set.one)
  })

  scenario('creates a set', async (scenario: StandardScenario) => {
    const result = await createSet({
      input: { done: true, setGroupId: scenario.set.two.setGroupId },
    })

    expect(result.done).toEqual(true)
    expect(result.setGroupId).toEqual(scenario.set.two.setGroupId)
  })

  scenario('updates a set', async (scenario: StandardScenario) => {
    const original = await set({ id: scenario.set.one.id })
    const result = await updateSet({
      id: original.id,
      input: { done: false },
    })

    expect(result.done).toEqual(false)
  })

  scenario('deletes a set', async (scenario: StandardScenario) => {
    const original = await deleteSet({ id: scenario.set.one.id })
    const result = await set({ id: original.id })

    expect(result).toEqual(null)
  })
})

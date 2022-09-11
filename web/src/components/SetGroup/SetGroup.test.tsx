import { render, screen, waitFor } from '@redwoodjs/testing/web'
import SetGroupContext, {
  OneSetGroupProps,
  RealisticSetGroupProps,
  ThreeSetGroupProps,
} from 'src/utils/context/SetGroupContext'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

describe('SetGroup', () => {
  it('renders a set group', () => {
    render(<SetGroupContext {...ThreeSetGroupProps} />)
    const exerciseName = screen.getByText(ThreeSetGroupProps.exercise.name)

    expect(exerciseName).toBeInTheDocument()

    // Make sure there are as many sets as defined in the SetGroupProps
    for (let i = 0; i < ThreeSetGroupProps.sets.length; i++) {
      expect(screen.getByText(i + 1)).toBeInTheDocument()
    }
  })

  it('contains the right values for all sets', () => {
    render(<SetGroupContext {...RealisticSetGroupProps} />)
    const valuesToTest = createValuesToTest()

    Object.keys(valuesToTest.previousWeight).forEach((key) => {
      const previousWeights = screen.getAllByText(key, { exact: false })
      expect(previousWeights.length).toBe(valuesToTest.previousWeight[key])
    })

    Object.keys(valuesToTest.previousReps).forEach((key) => {
      const previousReps = screen.getAllByText(key, { exact: false })
      expect(previousReps.length).toBe(valuesToTest.previousReps[key])
    })

    Object.keys(valuesToTest.weight).forEach((key) => {
      const weights = screen.getAllByDisplayValue(key)
      expect(weights.length).toBe(valuesToTest.weight[key])
    })

    Object.keys(valuesToTest.reps).forEach((key) => {
      const reps = screen.getAllByDisplayValue(key)
      expect(reps.length).toBe(valuesToTest.reps[key])
    })

    const doneChecked = screen.getAllByRole('checkbox', {
      hidden: true,
      checked: true,
    })
    expect(doneChecked.length).toBe(valuesToTest.done.checked)

    const doneUnChecked = screen.getAllByRole('checkbox', {
      hidden: true,
      checked: false,
    })
    expect(doneUnChecked.length).toBe(valuesToTest.done.unchecked)
  })

  it('has a green background for all finished sets', () => {
    render(<SetGroupContext {...RealisticSetGroupProps} />)
    const setContainerDivs = screen.getAllByTestId('set-container-div')
    setContainerDivs.forEach((setWrapper, i) => {
      if (RealisticSetGroupProps.sets[i].done) {
        expect(setWrapper.className).toMatch(/bg-green/i)
      } else {
        expect(setWrapper.className).not.toMatch(/bg-green/i)
      }
    })
  })

  it('is not showing the delete button', () => {
    render(<SetGroupContext {...OneSetGroupProps} />)
    const deleteButton = screen.getByText('Delete')
    expect(deleteButton).toHaveStyle({
      transform: 'translateX(0px)',
    })
  })

  it('allows you to add a set', async () => {
    const user = userEvent.setup()
    render(<SetGroupContext {...OneSetGroupProps} />)
    let setContainerDivs = screen.getAllByTestId('set-container-div')
    expect(setContainerDivs.length).toEqual(OneSetGroupProps.sets.length)

    const addSetButton = screen.getByText('Add Set', { exact: false })
    await waitFor(() => user.click(addSetButton))
    await waitFor(() => new Promise((r) => setTimeout(r, 500)))
    setContainerDivs = screen.getAllByTestId('set-container-div')
    expect(setContainerDivs.length).toEqual(OneSetGroupProps.sets.length + 1)
  })

  it('allows you to delete a set', async () => {
    const user = userEvent.setup()
    render(<SetGroupContext {...ThreeSetGroupProps} />)
    let setContainerDivs = screen.getAllByTestId('set-container-div')
    expect(setContainerDivs.length).toEqual(ThreeSetGroupProps.sets.length)

    const deleteSetButton = screen.getAllByText('Delete', { exact: false })
    await waitFor(() => user.click(deleteSetButton[0]))
    await waitFor(() => new Promise((r) => setTimeout(r, 500)))
    setContainerDivs = screen.getAllByTestId('set-container-div')
    expect(setContainerDivs.length).toEqual(ThreeSetGroupProps.sets.length - 1)
  })
})

function createValuesToTest() {
  const values = {
    previousWeight: {},
    previousReps: {},
    weight: {},
    reps: {},
    done: { checked: 0, unchecked: 0 },
  }
  RealisticSetGroupProps.exercise.latestSetGroup.sets.forEach((set) => {
    if (set.weight) {
      values.previousWeight[set.weight]
        ? values.previousWeight[set.weight]++
        : (values.previousWeight[set.weight] = 1)
    }
    if (set.reps) {
      values.previousReps[set.reps]
        ? values.previousReps[set.reps]++
        : (values.previousReps[set.reps] = 1)
    }
  })

  RealisticSetGroupProps.sets.forEach((set) => {
    if (set.weight) {
      values.weight[set.weight]
        ? values.weight[set.weight]++
        : (values.weight[set.weight] = 1)
    }
    if (set.reps) {
      values.reps[set.reps]
        ? values.reps[set.reps]++
        : (values.reps[set.reps] = 1)
    }
    if (set.done) {
      values.done.checked++
    } else {
      values.done.unchecked++
    }
  })

  if (
    Object.keys(values.weight).some((k) => Object.keys(values.reps).includes(k))
  )
    throw new Error(
      'Weights and Reps cannot share values. Else the test is ambiguous.'
    )

  return values
}

import { render, screen, waitFor } from '@redwoodjs/testing/web'
import SetContext, {
  DoneSetProps,
  FilledSetProps,
  NewSetProps,
  SetWithPreviousProps,
} from 'src/utils/components/SetContext'
import userEvent from '@testing-library/user-event'

describe('Set', () => {
  it('renders a set', () => {
    render(<SetContext {...FilledSetProps} />)

    const numberInputs = screen.getAllByRole('spinbutton')
    const weightInput = screen.getByRole('spinbutton', { name: /weight/i })
    const repsInput = screen.getByRole('spinbutton', { name: /reps/i })
    const doneInput = screen.getByRole('checkbox', { hidden: true })

    expect(numberInputs.length).toBe(2)

    expect(weightInput).toBeInTheDocument()
    expect(repsInput).toBeInTheDocument()
    expect(doneInput).toBeInTheDocument()
  })

  it('contains the right values for a set', () => {
    render(<SetContext {...FilledSetProps} />)

    const weightInput = screen.getByRole('spinbutton', { name: /weight/i })
    const repsInput = screen.getByRole('spinbutton', { name: /reps/i })
    const doneInput = screen.getByRole('checkbox', { hidden: true })

    expect(weightInput).toHaveValue(FilledSetProps.weight)
    expect(weightInput).toHaveAttribute(
      'placeholder',
      FilledSetProps.previous.weight.toString()
    )

    expect(repsInput).toHaveValue(FilledSetProps.reps)
    expect(repsInput).toHaveAttribute(
      'placeholder',
      FilledSetProps.previous.reps.toString()
    )
    if (FilledSetProps.done) {
      expect(doneInput).toBeChecked()
    } else {
      expect(doneInput).not.toBeChecked()
    }
  })

  it('has a green background once done', () => {
    render(<SetContext {...DoneSetProps} />)
    const setWrapper = screen.getByTestId('set-container-div')
    expect(setWrapper.className).toMatch(/bg-green/i)
  })

  it('does not have a green background if not yet done', () => {
    render(<SetContext {...FilledSetProps} />)
    const setWrapper = screen.getByTestId('set-container-div')
    expect(setWrapper.className).not.toMatch(/bg-green/i)
  })

  it('allows you enter values into the inputs', async () => {
    const user = userEvent.setup()
    render(<SetContext {...NewSetProps} />)

    const weightInput = screen.getByRole('spinbutton', { name: /weight/i })
    const repsInput = screen.getByRole('spinbutton', { name: /reps/i })

    expect(weightInput).not.toHaveValue()
    expect(repsInput).not.toHaveValue()

    await waitFor(() => user.click(weightInput))
    await waitFor(() => user.keyboard('10'))

    await waitFor(() => user.click(repsInput))
    await waitFor(() => user.keyboard('12'))

    expect(weightInput).toHaveValue(10)
    expect(repsInput).toHaveValue(12)
  })

  it('changes the color of the previous values once there are new values', async () => {
    const user = userEvent.setup()
    render(<SetContext {...SetWithPreviousProps} />)

    const weightInput = screen.getByRole('spinbutton', { name: /weight/i })
    const previousWeight = SetWithPreviousProps.previous.weight
    const previousReps = SetWithPreviousProps.previous.reps
    const re = new RegExp(`.*${previousWeight}.*${previousReps}.*`)
    const preValuesBefore = screen.getByText(re)
    const classNamesBefore = preValuesBefore.className

    await waitFor(() => user.click(weightInput))
    await waitFor(() => user.keyboard('10'))

    const preValuesAfter = screen.getByText(re)
    const classNamesAfter = preValuesAfter.className

    expect(classNamesBefore).not.toEqual(classNamesAfter)
  })

  it('allows you mark a set as done', async () => {
    const user = userEvent.setup()
    render(<SetContext {...FilledSetProps} />)

    const doneLabel = screen.getByText('✓')
    const doneInput = screen.getByRole('checkbox', { hidden: true })
    const setWrapper = screen.getByTestId('set-container-div')

    expect(setWrapper.className).not.toMatch(/bg-green/i)
    expect(doneInput).not.toBeChecked()

    await waitFor(() => user.click(doneLabel))

    expect(setWrapper.className).toMatch(/bg-green/i)
    expect(doneInput).toBeChecked()
  })
})

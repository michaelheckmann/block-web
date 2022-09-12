import { render, screen, waitFor } from '@redwoodjs/testing/web'
import PopoverMenuContext from 'src/utils/context/PopoverMenuContext'
import {
  TopLeftProps,
  BottomLeftProps,
  BottomRightProps,
  TopRightProps,
} from 'src/utils/context/PopoverMenuContext'
import userEvent from '@testing-library/user-event'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PopoverMenu', () => {
  beforeEach(() => {
    global.ResizeObserver = require('resize-observer-polyfill')
  })

  it('renders a popover menu in top left corner', async () => {
    const user = userEvent.setup()
    render(<PopoverMenuContext {...TopLeftProps} />)
    const triggerButton = await screen.findByRole('button')

    await waitFor(() => user.click(triggerButton))
    await waitFor(() => new Promise((r) => setTimeout(r, 500)))
    TopLeftProps.actions.forEach((action) => {
      expect(screen.getByText(action.label)).toBeInTheDocument()
    })
  })

  it('renders a popover menu in top right corner', async () => {
    const user = userEvent.setup()
    render(<PopoverMenuContext {...TopRightProps} />)
    const triggerButton = await screen.findByRole('button')

    await waitFor(() => user.click(triggerButton))
    await waitFor(() => new Promise((r) => setTimeout(r, 500)))
    TopRightProps.actions.forEach((action) => {
      expect(screen.getByText(action.label)).toBeInTheDocument()
    })
  })

  it('renders a popover menu in bottom left corner', async () => {
    const user = userEvent.setup()
    render(<PopoverMenuContext {...BottomLeftProps} />)
    const triggerButton = await screen.findByRole('button')

    await waitFor(() => user.click(triggerButton))
    await waitFor(() => new Promise((r) => setTimeout(r, 500)))
    BottomLeftProps.actions.forEach((action) => {
      expect(screen.getByText(action.label)).toBeInTheDocument()
    })
  })

  it('renders a popover menu in bottom right corner', async () => {
    const user = userEvent.setup()
    render(<PopoverMenuContext {...BottomRightProps} />)
    const triggerButton = await screen.findByRole('button')

    await waitFor(() => user.click(triggerButton))
    await waitFor(() => new Promise((r) => setTimeout(r, 500)))
    BottomRightProps.actions.forEach((action) => {
      expect(screen.getByText(action.label)).toBeInTheDocument()
    })
  })
})

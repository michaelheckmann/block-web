import { render, screen } from '@redwoodjs/testing/web'

import HomePage from './HomePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HomePage', () => {
  // beforeEach(() => {
  //   mockCurrentUser({ id: 1 })
  // })

  it('renders successfully', () => {
    render(<HomePage />)
    const button = screen.getByText('New Workout')
    expect(button).toBeInTheDocument()
  })
})

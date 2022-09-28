import { render, screen } from '@redwoodjs/testing/web'
import { standard } from 'src/components/WorkoutsCell/WorkoutsCell.mock'

import HomePage from './HomePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HomePage', () => {
  it('renders successfully', () => {
    mockGraphQLQuery('FindWorkouts', () => {
      return {
        ...standard(),
      }
    })
    render(<HomePage />)
    const button = screen.getByText('New Workout')
    expect(button).toBeInTheDocument()
  })
})

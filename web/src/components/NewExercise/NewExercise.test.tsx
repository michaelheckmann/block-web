import { render } from '@redwoodjs/testing/web'

import NewExercise from './NewExercise'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewExercise', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewExercise />)
    }).not.toThrow()
  })
})

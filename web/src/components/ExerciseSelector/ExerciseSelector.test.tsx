import { render } from '@redwoodjs/testing/web'

import ExerciseSelector from './ExerciseSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ExerciseSelector', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExerciseSelector />)
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'
import { standard } from 'src/components/ExercisesCell/ExercisesCell.mock'

import ExerciseSelector from './ExerciseSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ExerciseSelector', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ExerciseSelector
          exercises={standard().exercises}
          handleExerciseSelect={() => {}}
        />
      )
    }).not.toThrow()
  })
})

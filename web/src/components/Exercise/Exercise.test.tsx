import { render } from '@redwoodjs/testing/web'

import Exercise from './Exercise'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Exercise', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Exercise
          exercise={{
            __typename: 'Exercise',
            id: 0,
            name: '',
            setGroups: [],
          }}
        />
      )
    }).not.toThrow()
  })
})

import { render } from '@redwoodjs/testing/web'

import SetGroupCard from './SetGroupCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SetGroupCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetGroupCard />)
    }).not.toThrow()
  })
})

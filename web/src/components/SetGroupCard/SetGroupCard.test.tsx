import { render } from '@redwoodjs/testing/web'
import SetGroupCardContext from 'src/utils/context/SetGroupCardContext'
import { EmptySetGroupProps } from 'src/utils/context/SetGroupContext'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SetGroupCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetGroupCardContext {...EmptySetGroupProps} />)
    }).not.toThrow()
  })
})

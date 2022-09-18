import { render, screen, waitFor, prettyDOM } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'
import ModalContext, {
  InitHiddenModalProps,
} from 'src/utils/context/ModalContext'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

// Cannot do a full test with the openend modal as the modal
// is rendered to a sibling of the root element
// and is always null, even when the modal is open
// https://headlessui.com/react/dialog
describe('Modal', () => {
  it('renders a modal successfully', () => {
    render(<ModalContext {...InitHiddenModalProps} />)
    expect(screen.getByText('Open Modal')).toBeInTheDocument()
  })
})

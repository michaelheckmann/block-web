import ModalContext, {
  ComplexModalProps,
  ExerciseModalProps,
  ExerciseSelectorModalProps,
  InitHiddenModalProps,
  SimpleModalProps,
} from 'src/utils/context/ModalContext'

const Template = (args) => {
  return <ModalContext {...args} />
}

export const SimpleModal = Template.bind({})
SimpleModal.args = SimpleModalProps

export const ComplexModal = Template.bind({})
ComplexModal.args = ComplexModalProps

export const InitHiddenModal = Template.bind({})
InitHiddenModal.args = InitHiddenModalProps

export const ExerciseModal = Template.bind({})
ExerciseModal.args = ExerciseModalProps

export const ExerciseSelectorModal = Template.bind({})
ExerciseSelectorModal.args = ExerciseSelectorModalProps

export default { title: 'Components/Modal' }

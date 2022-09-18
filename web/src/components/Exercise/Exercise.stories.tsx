import ExerciseContext, {
  MultiSetGroupExerciseProps,
  RealisticExerciseProps,
  SimpleExerciseProps,
} from 'src/utils/context/ExerciseContext'

const Template = (args) => {
  return <ExerciseContext {...args} />
}

export const SimpleExercise = Template.bind({})
SimpleExercise.args = SimpleExerciseProps

export const MultiSetGroupExercise = Template.bind({})
MultiSetGroupExercise.args = MultiSetGroupExerciseProps

export const RealisticExercise = Template.bind({})
RealisticExercise.args = RealisticExerciseProps

export default { title: 'Components/Exercise' }

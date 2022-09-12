import GenericContext from 'src/utils/context/GenericContext'
import WorkoutCell from '.'

const Template = (args) => (
  <GenericContext {...args}>
    <WorkoutCell id={0} />
  </GenericContext>
)

export const Generated = Template.bind({})

export default {
  title: 'Components/WorkoutCell',
}

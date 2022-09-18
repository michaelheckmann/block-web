import GenericContext from 'src/utils/context/GenericContext'
import { Loading, Failure, Success } from './WorkoutCell'
import { standard } from './WorkoutCell.mock'

const Template = (args) => (
  <GenericContext {...args}>
    <Success {...standard()} {...args} />
  </GenericContext>
)

export const Generated = Template.bind({})

export const loading = (args) => {
  return Loading ? <Loading {...args} /> : null
}

export const failure = (args) => {
  return Failure ? <Failure error={new Error('Oh no')} {...args} /> : null
}

export default {
  title: 'Cells/WorkoutCell',
}

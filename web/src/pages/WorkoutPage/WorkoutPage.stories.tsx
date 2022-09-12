import GenericContext from 'src/utils/context/GenericContext'
import WorkoutPage from './WorkoutPage'

const Template = (args) => (
  <GenericContext>
    <WorkoutPage id={0} />
  </GenericContext>
)

export const Generated = Template.bind({})

export default {
  title: 'Pages/WorkoutPage',
}

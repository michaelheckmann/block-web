import SetGroupCardContext, {
  EmptySetGroupProps,
  LongNameSetGroupProps,
  OneSetGroupProps,
  RealisticSetGroupProps,
  ThreeSetGroupProps,
} from 'src/utils/context/SetGroupCardContext'
import { omitStoryBookArgs } from 'src/utils/functions/omitStoryBookArgs'

const Template = (args) => <SetGroupCardContext {...args} />

export const EmptySetGroup = Template.bind({})
EmptySetGroup.args = EmptySetGroupProps

export const OneSetGroup = Template.bind({})
OneSetGroup.args = OneSetGroupProps

export const ThreeSetGroup = Template.bind({})
ThreeSetGroup.args = ThreeSetGroupProps

export const RealisticSetGroup = Template.bind({})
RealisticSetGroup.args = RealisticSetGroupProps

export const LongNameSetGroup = Template.bind({})
LongNameSetGroup.args = LongNameSetGroupProps

export default {
  title: 'Components/SetGroupCard',
  argTypes: {
    ...omitStoryBookArgs(['setGroupId', 'setGroupIndex', 'exercise', 'sets']),
  },
}

import SetGroupContext, {
  EmptySetGroupProps,
  LongNameSetGroupProps,
  OneSetGroupProps,
  RealisticSetGroupProps,
  ThreeSetGroupProps,
} from 'src/components/SetGroup/SetGroupContext'

const Template = (args) => <SetGroupContext {...args} />

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
  title: 'Components/SetGroup',
  argTypes: {
    exercise: {
      table: {
        disable: true,
      },
    },
    sets: {
      table: {
        disable: true,
      },
    },
  },
}

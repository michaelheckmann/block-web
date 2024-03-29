import SetContext, {
  DoneSetProps,
  FilledSetProps,
  NewSetProps,
  SetWithPreviousProps,
} from 'src/utils/context/SetContext'
import { omitStoryBookArgs } from 'src/utils/functions/omitStoryBookArgs'

const Template = (args) => {
  return <SetContext {...args} />
}

export const NewSet = Template.bind({})
NewSet.args = NewSetProps

export const SetWithPrevious = Template.bind({})
SetWithPrevious.args = SetWithPreviousProps

export const FilledSet = Template.bind({})
FilledSet.args = FilledSetProps

export const DoneSet = Template.bind({})
DoneSet.args = DoneSetProps

export default {
  title: 'Components/Set',
  argTypes: {
    ...omitStoryBookArgs([
      'setGroupIndex',
      'setIndex',
      'setId',
      'reps',
      'weight',
    ]),
  },
}

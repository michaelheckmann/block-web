import { Form } from '@redwoodjs/forms'
import SetContext, {
  DoneSetProps,
  FilledSetProps,
  NewSetProps,
  SetWithPreviousProps,
} from 'src/utils/components/SetContext'

const Template = (args) => <SetContext {...args} />

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
  decorators: [
    (Story) => (
      <Form>
        <Story />
      </Form>
    ),
  ],
}

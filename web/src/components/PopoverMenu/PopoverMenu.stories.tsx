import PopoverMenuContext, {
  BottomLeftProps,
  BottomRightProps,
  TopLeftProps,
  TopRightProps,
} from 'src/utils/context/PopoverMenuContext'

const Template = (args) => <PopoverMenuContext {...args} />

export const TopLeftPopover = Template.bind({})
TopLeftPopover.args = TopLeftProps

export const TopRightPopover = Template.bind({})
TopRightPopover.args = TopRightProps

export const BottomLeftPopover = Template.bind({})
BottomLeftPopover.args = BottomLeftProps

export const BottomRightPopover = Template.bind({})
BottomRightPopover.args = BottomRightProps

export default { title: 'Components/PopoverMenu' }

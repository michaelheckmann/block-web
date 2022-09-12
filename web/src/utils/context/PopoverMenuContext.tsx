import {
  PencilIcon,
  ArrowPathIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import PopoverMenu, { ActionType } from 'src/components/PopoverMenu/PopoverMenu'

interface Props {
  classes?: string
  actions: ActionType[]
  children: React.ReactNode
}
function PopoverMenuContext(args: Props) {
  return (
    <div className={clsx('w-30 flex h-80 w-full bg-blue-100', args.classes)}>
      <PopoverMenu actions={args.actions}>{args.children}</PopoverMenu>
    </div>
  )
}

export default PopoverMenuContext

// Different configuration options for the different test cases

const DefaultProps = {
  actions: [
    {
      label: 'Add a Note',
      onClick: () => {},
      icon: <PencilIcon />,
    },
    {
      label: 'Replace Exercise',
      onClick: () => {},
      icon: <ArrowPathIcon />,
    },
    {
      label: 'Remove Exercise',
      onClick: () => {},
      icon: <XMarkIcon />,
      disabled: true,
    },
  ],
  children: <div>More</div>,
}

export const TopLeftProps: Props = {
  ...DefaultProps,
  classes: 'justify-start items-start',
}

export const TopRightProps: Props = {
  ...DefaultProps,
  classes: 'justify-end items-start',
}

export const BottomLeftProps: Props = {
  ...DefaultProps,
  classes: 'justify-start items-end',
}

export const BottomRightProps: Props = {
  ...DefaultProps,
  classes: 'justify-end items-end',
}

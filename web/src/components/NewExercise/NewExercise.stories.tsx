// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof NewExercise> = (args) => {
//   return <NewExercise {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import NewExercise from './NewExercise'

export const generated = () => {
  return <NewExercise />
}

export default {
  title: 'Components/NewExercise',
  component: NewExercise,
} as ComponentMeta<typeof NewExercise>

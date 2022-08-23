import { Form } from '@redwoodjs/forms'
import React from 'react'
import Set, { SetComponentType } from 'src/components/Set'

function SetContext(args: SetComponentType) {
  return (
    <Form>
      <Set setIndex={0} setGroupIndex={0} {...args} />
    </Form>
  )
}

export default SetContext

export const NewSetProps: SetComponentType = {
  previous: {
    weight: undefined,
    reps: undefined,
  },
  weight: undefined,
  reps: undefined,
  done: false,
}

export const SetWithPreviousProps: SetComponentType = {
  ...NewSetProps,
  previous: {
    weight: 10,
    reps: 12,
  },
  done: false,
}

export const FilledSetProps: SetComponentType = {
  ...NewSetProps,
  previous: {
    weight: 10,
    reps: 8,
  },
  weight: 10,
  reps: 12,
  done: false,
}

export const DoneSetProps: SetComponentType = {
  ...NewSetProps,
  previous: {
    weight: 10,
    reps: 8,
  },
  weight: 10,
  reps: 12,
  done: true,
}

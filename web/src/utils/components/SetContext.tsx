import { Form } from '@redwoodjs/forms'
import React from 'react'
import Set, { SetType } from 'src/components/Set'

function SetContext(args: SetType) {
  return (
    <Form>
      <Set setIndex={0} setGroupIndex={0} {...args} />
    </Form>
  )
}

export default SetContext

export const NewSetProps: SetType = {
  previous: {
    weight: undefined,
    reps: undefined,
  },
  weight: undefined,
  reps: undefined,
  done: false,
}

export const SetWithPreviousProps: SetType = {
  ...NewSetProps,
  previous: {
    weight: 10,
    reps: 12,
  },
  done: false,
}

export const FilledSetProps: SetType = {
  ...NewSetProps,
  previous: {
    weight: 10,
    reps: 8,
  },
  weight: 10,
  reps: 12,
  done: false,
}

export const DoneSetProps: SetType = {
  ...NewSetProps,
  previous: {
    weight: 10,
    reps: 8,
  },
  weight: 10,
  reps: 12,
  done: true,
}

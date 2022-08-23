import { useForm, useFieldArray, FormProvider } from '@redwoodjs/forms'
import React from 'react'
import SetGroup, { SetGroupComponentType } from 'src/components/SetGroup'
import { DoneSetProps, FilledSetProps, NewSetProps } from '../Set/SetContext'

function SetGroupContext(args: SetGroupComponentType) {
  const methods = useForm({
    defaultValues: {
      setGroups: [args],
    },
  })
  const { control } = methods
  const { fields } = useFieldArray({
    control,
    name: 'setGroups',
  })
  return (
    <FormProvider {...methods}>
      <form onSubmit={() => false}>
        {fields.map((item, setGroupIndex) => (
          <SetGroup key={item.id} {...item} setGroupIndex={setGroupIndex} />
        ))}
      </form>
    </FormProvider>
  )
}

export default SetGroupContext

export const EmptySetGroupProps: SetGroupComponentType = {
  exercise: { name: 'New Exercise' },
  sets: [],
}

export const OneSetGroupProps: SetGroupComponentType = {
  ...EmptySetGroupProps,
  sets: [FilledSetProps],
}

export const ThreeSetGroupProps: SetGroupComponentType = {
  ...EmptySetGroupProps,
  sets: [FilledSetProps, FilledSetProps, FilledSetProps],
}

export const RealisticSetGroupProps: SetGroupComponentType = {
  exercise: { name: 'Single Leg Hip Thrust' },
  sets: [DoneSetProps, DoneSetProps, FilledSetProps, FilledSetProps],
}

export const LongNameSetGroupProps: SetGroupComponentType = {
  exercise: {
    name: 'Single Leg Hip Thrust (Smith Machine) [to failure]',
  },
  sets: [DoneSetProps, DoneSetProps, FilledSetProps, FilledSetProps],
}

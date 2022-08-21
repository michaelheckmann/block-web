import { useForm, useFieldArray, FormProvider } from '@redwoodjs/forms'
import React from 'react'
import SetGroup, { SetGroupType } from 'src/components/SetGroup'
import { DoneSetProps, FilledSetProps, NewSetProps } from './SetContext'

function SetGroupContext(args: SetGroupType) {
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

export const EmptySetGroupProps: SetGroupType = {
  exercise: 'New Exercise',
  sets: [],
}

export const OneSetGroupProps: SetGroupType = {
  ...EmptySetGroupProps,
  sets: [FilledSetProps],
}

export const ThreeSetGroupProps: SetGroupType = {
  ...EmptySetGroupProps,
  sets: [FilledSetProps, FilledSetProps, FilledSetProps],
}

export const RealisticSetGroupProps: SetGroupType = {
  exercise: 'Single Leg Hip Thrust',
  sets: [DoneSetProps, DoneSetProps, FilledSetProps, FilledSetProps],
}

export const LongNameSetGroupProps: SetGroupType = {
  exercise: 'Single Leg Hip Thrust (Smith Machine) [to failure]',
  sets: [DoneSetProps, DoneSetProps, FilledSetProps, FilledSetProps],
}

import React from 'react'
import Exercise, { ExerciseProps } from 'src/components/Exercise/Exercise'
import { standard } from 'src/components/ExerciseCell/ExerciseCell.mock'
import { replaceIdWithUniqueId } from '../functions/replaceIdWithUniqueId'

function ExerciseContext(args: ExerciseProps) {
  return <Exercise {...args} />
}

const DefaultProps = {
  exercise: standard().exercise,
}

export const SimpleExerciseProps: ExerciseProps = {
  ...DefaultProps,
}

export const MultiSetGroupExerciseProps: ExerciseProps = {
  exercise: {
    ...DefaultProps.exercise,
    setGroups: [
      ...replaceIdWithUniqueId(DefaultProps.exercise.setGroups),
      ...replaceIdWithUniqueId(DefaultProps.exercise.setGroups),
      ...replaceIdWithUniqueId(DefaultProps.exercise.setGroups),
    ],
  },
}

export const RealisticExerciseProps: ExerciseProps = {
  exercise: {
    ...DefaultProps.exercise,
    // setGroups: [
    //   {
    //     id: 0,
    //     order: 0,
    //     workout: {
    //       done: true,
    //       createdAt: '2021-03-01T12:24:00.000Z',
    //     },
    //     sets: [
    //       {
    //         id: 0,
    //         reps: 10,
    //         weight: 100,
    //       },
    //       {
    //         id: 1,
    //         reps: 9,
    //         weight: 100,
    //       },
    //       {
    //         id: 2,
    //         reps: 8,
    //         weight: 100,
    //       },
    //     ],
    //   },
    //   {
    //     id: 1,
    //     order: 0,
    //     workout: {
    //       done: true,
    //       createdAt: '2021-02-20T20:14:00.000Z',
    //     },
    //     sets: [
    //       {
    //         id: 0,
    //         reps: 10,
    //         weight: 95,
    //       },
    //       {
    //         id: 1,
    //         reps: 10,
    //         weight: 95,
    //       },
    //       {
    //         id: 2,
    //         reps: 8,
    //         weight: 100,
    //       },
    //     ],
    //   },
    //   {
    //     id: 3,
    //     order: 2,
    //     workout: {
    //       done: true,
    //       createdAt: '2021-02-16T21:12:13.000Z',
    //     },
    //     sets: [
    //       {
    //         id: 0,
    //         reps: 10,
    //         weight: 95,
    //       },
    //       {
    //         id: 1,
    //         reps: 10,
    //         weight: 95,
    //       },
    //       {
    //         id: 2,
    //         reps: 10,
    //         weight: 95,
    //       },
    //     ],
    //   },
    // ],
  },
}

export default ExerciseContext

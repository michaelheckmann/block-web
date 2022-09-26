import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WorkoutCreateArgs>({
  workout: {
    one: {
      data: {
        name: 'String',
        done: true,
      },
    },
    two: {
      data: {
        name: 'String',
        done: true,
      },
    },
  },
})

export type StandardScenario = typeof standard

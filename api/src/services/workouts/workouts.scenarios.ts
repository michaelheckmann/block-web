import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WorkoutCreateArgs>({
  workout: {
    one: {
      data: {
        name: 'String',
        done: true,
        id: 1,
        templateId: 1,
      },
    },
    two: {
      data: {
        name: 'String',
        done: true,
        id: 1,
        templateId: 1,
      },
    },
  },
})

export type StandardScenario = typeof standard

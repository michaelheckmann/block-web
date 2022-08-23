import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.SetGroupCreateArgs>({
  setGroup: {
    one: {
      data: {
        exercise: { create: { name: 'String' } },
        workout: { create: { name: 'String', done: true } },
      },
    },
    two: {
      data: {
        exercise: { create: { name: 'String' } },
        workout: { create: { name: 'String', done: true } },
      },
    },
  },
})

export type StandardScenario = typeof standard

import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.SetCreateArgs>({
  set: {
    one: {
      data: {
        done: true,
        setGroup: {
          create: {
            exercise: { create: { name: 'String' } },
            workout: { create: { name: 'String', done: true } },
            order: 1,
          },
        },
      },
    },
    two: {
      data: {
        done: true,
        setGroup: {
          create: {
            exercise: { create: { name: 'String' } },
            workout: { create: { name: 'String', done: true } },
            order: 2,
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard

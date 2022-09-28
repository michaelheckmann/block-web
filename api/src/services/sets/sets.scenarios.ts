import type { Prisma } from '@prisma/client'
import { user } from 'src/services/users/users.scenarios'

export const standard = defineScenario<Prisma.SetCreateArgs>({
  set: {
    one: {
      data: {
        done: true,
        setGroup: {
          create: {
            exercise: { create: { name: 'String', user: { create: user() } } },
            workout: {
              create: { name: 'String', done: true, user: { create: user() } },
            },
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
            exercise: { create: { name: 'String', user: { create: user() } } },
            workout: {
              create: { name: 'String', done: true, user: { create: user() } },
            },
            order: 2,
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard

import type { Prisma } from '@prisma/client'
import { user } from 'src/services/users/users.scenarios'

export const standard = defineScenario<Prisma.SetGroupCreateArgs>({
  setGroup: {
    one: {
      data: {
        exercise: { create: { name: 'String', user: { create: user() } } },
        workout: {
          create: { name: 'String', done: true, user: { create: user() } },
        },
        order: 1,
      },
    },
    two: {
      data: {
        exercise: { create: { name: 'String', user: { create: user() } } },
        workout: {
          create: { name: 'String', done: true, user: { create: user() } },
        },
        order: 2,
      },
    },
  },
})

export type StandardScenario = typeof standard

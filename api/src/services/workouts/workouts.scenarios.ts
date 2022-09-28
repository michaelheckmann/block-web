import type { Prisma } from '@prisma/client'
import { user } from 'src/services/users/users.scenarios'

export const standard = defineScenario<Prisma.WorkoutCreateArgs>({
  workout: {
    one: {
      data: {
        name: 'String',
        done: true,
        user: { create: user() },
      },
    },
    two: {
      data: {
        name: 'String',
        done: true,
        user: { create: user() },
      },
    },
  },
})

export type StandardScenario = typeof standard

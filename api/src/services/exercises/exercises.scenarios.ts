import type { Prisma } from '@prisma/client'
import { user } from 'src/services/users/users.scenarios'

export const standard = defineScenario<Prisma.ExerciseCreateArgs>({
  exercise: {
    one: { data: { name: 'String', user: { create: user() } } },
    two: { data: { name: 'String', user: { create: user() } } },
  },
})

export type StandardScenario = typeof standard

import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ExerciseCreateArgs>({
  exercise: {
    one: { data: { name: 'String', userId: 1 } },
    two: { data: { name: 'String', userId: 1 } },
  },
})

export type StandardScenario = typeof standard

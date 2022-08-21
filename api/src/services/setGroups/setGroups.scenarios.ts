import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.SetGroupCreateArgs>({
  setGroup: {
    one: { data: { workout: { create: { name: 'String', done: true } } } },
    two: { data: { workout: { create: { name: 'String', done: true } } } },
  },
})

export type StandardScenario = typeof standard

import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TemplateCreateArgs>({
  template: {
    one: { data: { name: 'String', userId: 1 } },
    two: { data: { name: 'String', userId: 1 } },
  },
})

export type StandardScenario = typeof standard

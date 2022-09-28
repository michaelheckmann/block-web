import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        name: 'String',
        email: 'String8173889',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        name: 'String',
        email: 'String5844320',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>

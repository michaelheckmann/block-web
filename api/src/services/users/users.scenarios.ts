import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

// Create a number between 1 and 10
const randomNumber = () => Math.floor(Math.random() * 10) + 1
export const user = () => ({
  id: randomNumber(),
  email: randomNumber().toString(),
  hashedPassword: randomNumber().toString(),
  name: randomNumber().toString(),
  salt: randomNumber().toString(),
})

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

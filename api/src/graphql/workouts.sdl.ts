export const schema = gql`
  type Workout {
    id: Int!
    name: String!
    done: Boolean!
    setGroups: [SetGroup]!
    templateId: Int
    template: Template
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    workouts: [Workout!]! @requireAuth
    workoutsByUserId(id: Int!): [Workout!]! @requireAuth
    workout(id: Int!): Workout @requireAuth
  }

  input CreateWorkoutInput {
    name: String!
    done: Boolean!
    userId: Int!
    templateId: Int
  }

  input UpdateWorkoutInput {
    name: String
    done: Boolean
    templateId: Int
  }

  type Mutation {
    createWorkout(input: CreateWorkoutInput!): Workout! @requireAuth
    updateWorkout(id: Int!, input: UpdateWorkoutInput!): Workout! @requireAuth
    saveWorkout(id: Int!): Workout! @requireAuth
    deleteWorkout(id: Int!): Workout! @requireAuth
  }
`

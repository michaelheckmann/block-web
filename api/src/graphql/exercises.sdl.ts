export const schema = gql`
  type Exercise {
    id: Int!
    name: String!
    setGroups: [SetGroup]!
    latestSetGroup(workoutId: Int): SetGroup
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    exercises: [Exercise!]! @requireAuth
    exercise(id: Int!): Exercise @requireAuth
  }

  input CreateExerciseInput {
    name: String!
  }

  input UpdateExerciseInput {
    name: String
  }

  type Mutation {
    createExercise(input: CreateExerciseInput!): Exercise! @requireAuth
    updateExercise(id: Int!, input: UpdateExerciseInput!): Exercise!
      @requireAuth
    deleteExercise(id: Int!): Exercise! @requireAuth
  }
`

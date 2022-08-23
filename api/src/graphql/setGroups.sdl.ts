export const schema = gql`
  type SetGroup {
    id: Int!
    sets: [Set]!
    exerciseId: Int!
    exercise: Exercise!
    workoutId: Int!
    workout: Workout!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    setGroups: [SetGroup!]! @requireAuth
    setGroup(id: Int!): SetGroup @requireAuth
  }

  input CreateSetGroupInput {
    exerciseId: Int!
    workoutId: Int!
  }

  input UpdateSetGroupInput {
    exerciseId: Int
    workoutId: Int
  }

  type Mutation {
    createSetGroup(input: CreateSetGroupInput!): SetGroup! @requireAuth
    updateSetGroup(id: Int!, input: UpdateSetGroupInput!): SetGroup!
      @requireAuth
    deleteSetGroup(id: Int!): SetGroup! @requireAuth
  }
`

export const schema = gql`
  type SetGroup {
    id: Int!
    sets: [Set]!
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
    workoutId: Int!
  }

  input UpdateSetGroupInput {
    workoutId: Int
  }

  type Mutation {
    createSetGroup(input: CreateSetGroupInput!): SetGroup! @requireAuth
    updateSetGroup(id: Int!, input: UpdateSetGroupInput!): SetGroup!
      @requireAuth
    deleteSetGroup(id: Int!): SetGroup! @requireAuth
  }
`

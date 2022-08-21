export const schema = gql`
  type Set {
    id: Int!
    weight: Int
    reps: Int
    done: Boolean!
    setGroupId: Int!
    setGroup: SetGroup!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    sets: [Set!]! @requireAuth
    set(id: Int!): Set @requireAuth
  }

  input CreateSetInput {
    weight: Int
    reps: Int
    done: Boolean!
    setGroupId: Int!
  }

  input UpdateSetInput {
    weight: Int
    reps: Int
    done: Boolean
    setGroupId: Int
  }

  type Mutation {
    createSet(input: CreateSetInput!): Set! @requireAuth
    updateSet(id: Int!, input: UpdateSetInput!): Set! @requireAuth
    deleteSet(id: Int!): Set! @requireAuth
  }
`

export const schema = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    Workout: [Workout]!
    Exercise: [Exercise]!
    Template: [Template]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  # input CreateUserInput {
  #   name: String!
  #   email: String!
  #   hashedPassword: String!
  #   salt: String!
  #   resetToken: String
  #   resetTokenExpiresAt: DateTime
  #   webAuthnChallenge: String
  # }

  input UpdateUserInput {
    name: String
    email: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    webAuthnChallenge: String
  }

  type Mutation {
    # createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`

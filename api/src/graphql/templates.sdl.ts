export const schema = gql`
  type Template {
    id: Int!
    name: String!
    workouts: [Workout]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    templates: [Template!]! @requireAuth
    template(id: Int!): Template @requireAuth
  }

  input CreateTemplateInput {
    name: String!
  }

  input UpdateTemplateInput {
    name: String
  }

  type Mutation {
    createTemplate(input: CreateTemplateInput!): Template! @requireAuth
    updateTemplate(id: Int!, input: UpdateTemplateInput!): Template!
      @requireAuth
    deleteTemplate(id: Int!): Template! @requireAuth
  }
`

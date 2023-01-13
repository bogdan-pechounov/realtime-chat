const typeDefs = `#graphql
  type User {
    id: String
    name: String
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
    login(name: String!, password: String!): User
  }
`

export default typeDefs

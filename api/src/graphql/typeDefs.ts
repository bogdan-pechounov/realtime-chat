const typeDefs = `#graphql
  type User {
    id: String
    name: String
  }

  type Message {
    id: String
    body: String
    user: User
  }

  type Query {
    me: User
    users: [User]
    messages: [Message]
  }

  type Mutation {
    login(name: String!, password: String!): User
    sendMessage(body: String!): Message
  }
`

export default typeDefs

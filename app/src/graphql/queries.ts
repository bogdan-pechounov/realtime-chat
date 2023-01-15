import { gql } from '@apollo/client'

export const ME = gql`
  query {
    me {
      id
      name
    }
  }
`

export const MESSAGES = gql`
  query {
    messages {
      id
      body
      user {
        id
        name
      }
    }
  }
`

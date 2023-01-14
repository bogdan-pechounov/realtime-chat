import { gql } from '@apollo/client'

export const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      id
      body
      user {
        name
      }
    }
  }
`

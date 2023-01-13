import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation ($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      name
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation ($body: String!) {
    sendMessage(body: $body) {
      id
      body
      user {
        name
      }
    }
  }
`

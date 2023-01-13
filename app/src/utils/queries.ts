import { gql } from '@apollo/client'

export const ME = gql`
  query {
    me {
      id
      name
    }
  }
`

export const LOGIN = gql`
  mutation ($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      name
    }
  }
`

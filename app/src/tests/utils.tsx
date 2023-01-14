import { ME } from '~/graphql/queries'
import { MockedProvider } from '@apollo/client/testing'
import { render } from '@testing-library/react'
import { LOGIN } from '~/graphql/mutations'

const mocks = [
  {
    request: {
      query: ME,
    },
    result: {
      data: {
        me: {
          id: 'id',
          name: 'user',
        },
      },
    },
  },
  {
    request: {
      query: LOGIN,
      variables: {
        name: 'user',
        password: 'password',
      },
    },
    result: {
      data: {
        login: {
          name: 'user',
          password: 'password',
        },
      },
    },
  },
]

export function customRender(ui: React.ReactNode) {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {ui}
    </MockedProvider>
  )
}

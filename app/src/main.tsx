import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
})

// client
//   .query({
//     query: gql`
//       query {
//         me {
//           name
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result))
// client
//   .mutate({
//     mutation: gql`
//       mutation {
//         login(name: "user", password: "password") {
//           name
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { ApolloServer } from '@apollo/server'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import createApp from './app'

//config
const PORT = 5000
const DB_URI = 'mongodb://127.0.0.1:27017/tutorial_sessions'

//database
mongoose.set('strictQuery', true)
mongoose.connect(DB_URI, () => {
  console.log(`Connected to ${DB_URI}`)
})

//session store
const store = MongoStore.create({ mongoUrl: DB_URI })

//graphql
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.start().then(() => {
  console.log('Apollo server started')

  const app = createApp(server, store)
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
})

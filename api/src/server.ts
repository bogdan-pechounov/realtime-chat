import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { ApolloServer } from '@apollo/server'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import { createServer } from 'http'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { app, setUpApp } from './app'

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
const schema = makeExecutableSchema({ typeDefs, resolvers })

//set up http and ws servers
const httpServer = createServer(app)
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})
const serverCleanup = useServer({ schema }, wsServer)
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        }
      },
    },
  ],
})

server.start().then(() => {
  console.log('Apollo server started')

  setUpApp(server, store)

  httpServer.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
  })
})

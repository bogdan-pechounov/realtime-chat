import express from 'express'
import session, { Store } from 'express-session'
import passport from 'passport'
import { expressMiddleware } from '@apollo/server/express4'
import { buildContext } from 'graphql-passport'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import './config/passport'

export const app = express()

export function setUpApp(server: ApolloServer<any>, store: Store) {
  //middlewares
  app.use(express.json())
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

  //session
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      store,
      cookie: { secure: false },
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  //graphql
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
    })
  )
}

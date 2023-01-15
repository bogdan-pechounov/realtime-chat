import { Context } from 'graphql-passport/lib/buildContext'
import { PubSub } from 'graphql-subscriptions'
import Message from '../models/Message'
import User from '../models/User'
import { Resolvers, User as IUser } from '../generated/graphql'
import { Request as ExpressRequest } from 'express'
import { PassportContext } from 'graphql-passport'
import { GraphQLScalarType } from 'graphql/type'

export interface MyContext extends PassportContext<IUser, ExpressRequest> {}

const pubsub = new PubSub()

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  //@ts-ignore
  serialize(value: Date) {
    return value.getTime() // Convert outgoing Date to integer for JSON
  },
  //@ts-ignore
  parseValue(value: number) {
    return new Date(value) // Convert incoming integer to Date
  },
})

const resolvers: Resolvers = {
  Date: dateScalar,
  Message: {
    async user({ user }) {
      return await User.findById(user)
    },
  },
  Query: {
    me(_parent: unknown, args: unknown, context: Context<Express.User>) {
      return context.getUser()
    },
    async users() {
      return await User.find()
    },
    async messages() {
      return await Message.find()
    },
  },
  Mutation: {
    async login(_parent: any, { name, password }, context: any) {
      const { user }: { user: IUser } = await context.authenticate(
        'graphql-local',
        {
          email: name,
          password,
        }
      )
      await context.login(user)
      return user
    },
    async logout(_parent: any, _args: any, context: MyContext) {
      context.logout()
      return 'Logged out'
    },
    async sendMessage(_parent: any, { body }, context: any) {
      if (!context.isAuthenticated()) throw new Error('Not logged in')
      const message = await new Message({
        body,
        user: context.getUser(),
      }).save()
      pubsub.publish('MESSAGE_CREATED', { messageCreated: message })
      return message
    },
  },
  Subscription: {
    messageCreated: {
      //@ts-ignore
      subscribe() {
        return pubsub.asyncIterator(['MESSAGE_CREATED'])
      },
    },
  },
}

export default resolvers

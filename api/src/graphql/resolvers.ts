import { Context } from 'graphql-passport/lib/buildContext'
import { PubSub } from 'graphql-subscriptions'
import Message from '../models/Message'
import User from '../models/User'

type LoginInput = {
  name: String
  password: String
}

type MessageInput = {
  body: String
}

const pubsub = new PubSub()

const resolvers = {
  Query: {
    me(_parent: unknown, args: unknown, context: Context<Express.User>) {
      return context.getUser()
    },
    async users() {
      return await User.find()
    },
    async messages() {
      return await Message.find().populate('user')
    },
  },
  Mutation: {
    async login(_parent: any, { name, password }: LoginInput, context: any) {
      const { user } = await context.authenticate('graphql-local', {
        email: name,
        password,
      })
      await context.login(user)
      return user
    },
    async sendMessage(
      _parent: any,
      { body }: MessageInput,
      context: Context<Express.User>
    ) {
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
      subscribe() {
        return pubsub.asyncIterator(['MESSAGE_CREATED'])
      },
    },
  },
}

export default resolvers

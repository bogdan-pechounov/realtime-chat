import { Context } from 'graphql-passport/lib/buildContext'
import User from '../models/User'

type LoginInput = {
  name: String
  password: String
}

const resolvers = {
  Query: {
    me(parent: unknown, args: unknown, context: Context<Express.User>) {
      console.log(context.req.user)
      return context.getUser()
    },
    async users() {
      return await User.find()
    },
  },
  Mutation: {
    login: async (
      _parent: any,
      { name, password }: LoginInput,
      context: any
    ) => {
      // instead of email you can pass username as well
      const { user } = await context.authenticate('graphql-local', {
        email: name,
        password,
      })
      await context.login(user)
      return user
    },
  },
}

export default resolvers

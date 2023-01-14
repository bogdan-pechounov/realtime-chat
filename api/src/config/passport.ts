import passport from 'passport'
import User from '../models/User'
import { GraphQLLocalStrategy } from 'graphql-passport'

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use(
  new GraphQLLocalStrategy({}, async (name, password, done) => {
    try {
      const user = await User.findOne({ name })
      if (user) {
        //verify password todo
        if (password === user.password) {
          done(null, user)
        } else {
          done(null, false)
        }
      } else {
        //create user todo hash password
        const newUser = await new User({ name, password }).save()
        done(null, newUser)
      }
    } catch (err) {
      done(err)
    }
  })
)

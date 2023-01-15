import { Date, model, Schema } from 'mongoose'
import { IUser } from './User'

export interface IMessage {
  body: string
  user: IUser
  createdAt: Date
}

const messageSchema = new Schema<IMessage>(
  {
    body: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

const Message = model<IMessage>('Message', messageSchema)

export default Message

interface IMe {
  me?: IUser?
}

interface IMessages {
  messages?: [IMessage]
}

interface IMessageCreated {
  messageCreated: IMessage
}

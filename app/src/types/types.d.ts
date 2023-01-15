interface IUser {
  name: string
}

interface IMessage {
  id: string
  body: string
  user: {
    name: string
  }
}

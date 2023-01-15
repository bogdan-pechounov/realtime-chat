interface IUser {
  id: string
  name: string
}

interface IMessage {
  id: string
  body: string
  user: IUser
}

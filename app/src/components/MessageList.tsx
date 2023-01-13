import React from 'react'
import { useQuery } from '@apollo/client'
import { MESSAGES } from '../graphql/queries'

type Message = {
  id: React.Key
  body: String
  user: {
    name: String
  }
}

function MessageList() {
  const { data } = useQuery(MESSAGES)
  if (!data) return <p>No messages</p>
  console.log(data)
  return (
    <div>
      {data.messages.map(({ id, body, user }: Message) => {
        return (
          <div key={id}>
            {user.name} | {body}
          </div>
        )
      })}
    </div>
  )
}

export default MessageList

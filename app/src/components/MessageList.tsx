import React from 'react'
import { useQuery } from '@apollo/client'
import { MESSAGES } from '../utils/queries'

type Message = {
  id: React.Key
  body: String
}

function MessageList() {
  const { data } = useQuery(MESSAGES)
  if (!data) return <p>No messages</p>
  return (
    <div>
      {data.messages.map(({ id, body }: Message) => {
        return <div key={id}>{body}</div>
      })}
    </div>
  )
}

export default MessageList

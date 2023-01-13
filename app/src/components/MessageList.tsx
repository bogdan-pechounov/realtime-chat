import React, { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { MESSAGES } from '../graphql/queries'
import { MESSAGE_CREATED } from '../graphql/subscriptions'

type Message = {
  id: React.Key
  body: String
  user: {
    name: String
  }
}

function MessageList() {
  const [newMessages, setNewMessages] = useState<Message[]>([])
  const { data } = useQuery(MESSAGES)
  useSubscription(MESSAGE_CREATED, {
    onData({
      data: {
        data: { messageCreated },
      },
    }) {
      setNewMessages([...newMessages, messageCreated as Message])
    },
  })
  if (!data) return <p>No messages</p>
  const messages = [...data.messages, ...newMessages]
  return (
    <div>
      {messages.map(({ id, body, user }: Message) => {
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

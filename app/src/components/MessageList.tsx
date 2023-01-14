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
  const { data } = useQuery(MESSAGES)
  useSubscription(MESSAGE_CREATED, {
    onData({
      data: {
        data: { messageCreated },
      },
      client,
    }) {
      client.writeQuery({
        query: MESSAGES,
        data: {
          messages: [...data.messages, messageCreated],
        },
      })
    },
  })
  if (!data) return <p>No messages</p>
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

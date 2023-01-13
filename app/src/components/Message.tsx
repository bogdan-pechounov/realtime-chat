import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { SEND_MESSAGE } from '../graphql/mutations'

function Message() {
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [body, setBody] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage({ variables: { body } })
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='message'>Message</label>
      <input
        type='text'
        name='message'
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <button type='submit'>Send message</button>
    </form>
  )
}

export default Message

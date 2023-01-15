import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { SEND_MESSAGE } from '../graphql/mutations'
import SendIcon from '@mui/icons-material/Send'
import { FormControl, TextField } from '@mui/material'
import { IconButton } from '@mui/material'
import { Stack } from '@mui/material'
import { InputLabel } from '@mui/material'

function SendMessage() {
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [body, setBody] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage({ variables: { body } })
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack direction='row'>
        <FormControl fullWidth>
          <TextField
            type='text'
            name='message'
            value={body}
            label='Type a message...'
            onChange={(e) => setBody(e.target.value)}
          ></TextField>
        </FormControl>
        <IconButton aria-label='send' type='submit'>
          <SendIcon color='primary' />
        </IconButton>
      </Stack>
    </form>
  )
}

export default SendMessage

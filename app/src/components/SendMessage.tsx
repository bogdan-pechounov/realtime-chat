import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { SEND_MESSAGE } from '../graphql/mutations'
import SendIcon from '@mui/icons-material/Send'
import { FormControl, TextField } from '@mui/material'
import { IconButton } from '@mui/material'
import { Stack } from '@mui/material'

type SendMessageProps = {
  user: IUser | undefined | null
}

function SendMessage({ user }: SendMessageProps) {
  const [sendMessage] = useMutation(SEND_MESSAGE)
  const [body, setBody] = useState('')

  const disabled = body.length === 0 || !user
  const color = disabled ? 'disabled' : 'primary'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await sendMessage({ variables: { body } })
    setBody('')
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
            variant='outlined'
            autoComplete='off'
          ></TextField>
        </FormControl>
        <IconButton aria-label='send' type='submit' disabled={disabled}>
          <SendIcon color={color} />
        </IconButton>
      </Stack>
    </form>
  )
}

export default SendMessage

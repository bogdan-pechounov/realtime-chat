import { Typography } from '@mui/material'
import React from 'react'

type MessageProps = {
  me: IUser | undefined | null
  message: IMessage
}

function Message({ message: { body, user }, me }: MessageProps) {
  const align = user.id === me?.id ? 'right' : 'left'
  return (
    <Typography align={align}>
      {user.name} | {body}
    </Typography>
  )
}

export default Message

import {
  Avatar,
  Box,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
} from '@mui/material'
import { useMemo } from 'react'

type MessageProps = {
  me: IUser | undefined | null
  message: IMessage
}

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] ?? ''}`,
  }
}

function Message({ message: { body, user, createdAt }, me }: MessageProps) {
  const align = user.id === me?.id ? 'end' : 'start'
  const direction = user.id === me?.id ? 'row-reverse' : 'row'

  const formattedTime = useMemo<string>(() => {
    const date = new Date(createdAt)
    return date.toTimeString().slice(0, 5)
  }, [createdAt])

  return (
    <ListItem>
      <Stack direction={direction} width='100%'>
        <Box p={1}>
          <Tooltip title={user.name}>
            <Avatar {...stringAvatar(user.name)} />
          </Tooltip>
        </Box>
        <Stack direction='column' textAlign={align}>
          <ListItemText primary={body} />
          <ListItemText secondary={formattedTime} />
        </Stack>
      </Stack>
    </ListItem>
  )
}

export default Message

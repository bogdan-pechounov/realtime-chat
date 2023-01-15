import { useEffect, useRef } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { MESSAGES } from '../graphql/queries'
import { MESSAGE_CREATED } from '../graphql/subscriptions'
import { List, ListItemText, Paper, Container } from '@mui/material'
import SendMessage from './SendMessage'
import { Box } from '@mui/material'

function MessageList() {
  const { data } = useQuery<IMessages>(MESSAGES)
  const bottomOfList = useRef<HTMLInputElement>(null)

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
          messages: [...(data?.messages ?? []), messageCreated],
        },
      })
    },
  })

  useEffect(() => {
    scrollToBottom()
  }, [data])

  /**
   * Scroll to the bottom of the message list when a new message is sent
   */
  function scrollToBottom() {
    //todo check if at bottom before scrolling
    bottomOfList.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Container>
      <Box my={1}>
        <Paper elevation={10}>
          <List sx={{ height: '70vh', overflow: 'auto' }}>
            {data?.messages?.map(({ id, body, user }: IMessage) => {
              return (
                <ListItemText key={id}>
                  {user.name} | {body}
                </ListItemText>
              )
            })}
            <div ref={bottomOfList}></div>
          </List>
          <Box p={2}>
            <SendMessage />
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default MessageList

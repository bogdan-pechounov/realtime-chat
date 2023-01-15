import { useEffect, useRef, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { MESSAGES } from '../graphql/queries'
import { MESSAGE_CREATED } from '../graphql/subscriptions'
import { List, ListItemText, Paper, Container } from '@mui/material'
import SendMessage from './SendMessage'
import { Box } from '@mui/material'

function Chat() {
  //#region Messages
  const { data } = useQuery<IMessages>(MESSAGES)
  useSubscription(MESSAGE_CREATED, {
    onData({
      data: {
        data: { messageCreated },
      },
      client,
    }) {
      //append new message to the cached response
      client.writeQuery({
        query: MESSAGES,
        data: {
          messages: [...(data?.messages ?? []), messageCreated],
        },
      })
    },
  })
  //#endregion

  //#region Scrolling
  const bottomOfList = useRef<HTMLInputElement>(null)
  const [scrollOnce, setScrollOnce] = useState(false)

  useEffect(() => {
    if (!scrollOnce && data?.messages) {
      scrollToBottom()
      setScrollOnce(true)
    } else if (isBottom()) scrollToBottom()
  }, [data])

  /**
   * Check if at bottom before scrolling
   */
  function isBottom() {
    const parent = bottomOfList.current?.parentElement?.getBoundingClientRect()
    const sibling =
      bottomOfList.current?.previousElementSibling?.getBoundingClientRect() //sibling is where the div was before the new element was added
    if (!sibling || !parent) return
    const wasVisible = sibling.y - parent.y < parent.height //was visible before new element added
    return wasVisible
  }

  /**
   * Scroll to the bottom of the message list when a new message is sent
   */
  function scrollToBottom() {
    bottomOfList.current?.scrollIntoView({ behavior: 'smooth' })
  }
  //#endregion

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}
    >
      <Box my={1} height='100%'>
        <Paper
          elevation={6}
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <List sx={{ flex: '1 1 auto' }}>
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
            <SendMessage onSend={scrollToBottom} />
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Chat

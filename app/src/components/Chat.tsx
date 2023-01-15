import { useEffect, useRef, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { MESSAGES } from '../graphql/queries'
import { MESSAGE_CREATED } from '../graphql/subscriptions'
import { List, ListItemText, Paper, Container } from '@mui/material'
import SendMessage from './SendMessage'
import { Box } from '@mui/material'
import Message from './Message'

type ChatProps = {
  user: IUser | undefined | null
}

function Chat({ user }: ChatProps) {
  //#region Messages
  const { data: { messages } = {} } = useQuery<IMessages>(MESSAGES)
  const { data: { messageCreated } = {} } = useSubscription<IMessageCreated>(
    MESSAGE_CREATED,
    {
      onData({ data: { data: { messageCreated } = {} }, client }) {
        //append new message to the cached response
        client.writeQuery({
          query: MESSAGES,
          data: {
            messages: [...(messages ?? []), messageCreated],
          },
        })
      },
    }
  )
  //#endregion

  //#region Scrolling
  const bottomOfList = useRef<HTMLInputElement>(null)
  const [scrollOnce, setScrollOnce] = useState(false)

  useEffect(() => {
    //scroll on first load
    if (!scrollOnce && messages) {
      scrollToBottom()
      setScrollOnce(true)
    }
    //scroll only if already at the bottom
    else if (isBottom()) scrollToBottom()
    //scroll if you sent the message
    else if (messageCreated?.user.id === user?.id) scrollToBottom()
  }, [messages])

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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        overflow: 'auto',
        padding: '16px 0',
      }}
    >
      <Box height='100%'>
        <Paper
          elevation={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <List sx={{ flex: '1 1 auto', overflow: 'auto' }}>
            {messages?.map((message: IMessage) => {
              return <Message key={message.id} message={message} me={user} />
            })}
            <div ref={bottomOfList}></div>
          </List>
          <Box p={2}>
            <SendMessage user={user} />
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Chat

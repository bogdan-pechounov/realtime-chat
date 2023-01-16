import { render, screen } from '@testing-library/react'
import SendMessage from '~/components/SendMessage'
import { customRender } from './utils'
import userEvent from '@testing-library/user-event'

describe('Send Message', () => {
  test('disabled if no user', () => {
    customRender(<SendMessage user={null} />)
    const sendButton = screen.getByRole('button', { name: /send/i })
    expect(sendButton).toBeDisabled()
  })

  test('disabled if empty message', () => {
    customRender(<SendMessage user={{ name: 'User', id: 'id' }} />)
    const sendButton = screen.getByRole('button', { name: /send/i })
    expect(sendButton).toBeDisabled()
  })

  test('enabled', async () => {
    const user = userEvent.setup()
    customRender(<SendMessage user={{ name: 'User', id: 'id' }} />)

    const sendButton = screen.getByRole('button', { name: /send/i })
    const messageInput = screen.getByRole('textbox', {
      name: /type a message\.\.\./i,
    })

    await user.type(messageInput, 'message')
    expect(sendButton).toBeEnabled()
  })
})

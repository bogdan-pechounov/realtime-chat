import { screen, waitFor } from '@testing-library/react'
import Login from '~/components/Login'
import { customRender } from './utils'
import userEvent from '@testing-library/user-event'

describe('App', async () => {
  it('renders', async () => {
    const user = userEvent.setup()
    customRender(<Login />)
    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    await user.type(usernameInput, 'user')
    await user.type(passwordInput, 'password')
    expect(usernameInput).toHaveValue('user')
    expect(passwordInput).toHaveValue('password')

    await user.click(loginButton)
    await waitFor(() => expect(usernameInput).toHaveValue(''))
    expect(passwordInput).toHaveValue('')
  })
})

import { screen, waitFor } from '@testing-library/react'
import { customRender } from './utils'
import userEvent from '@testing-library/user-event'
import LoginDialog from '~/components/LoginDialog'

describe('Login Dialog', async () => {
  // it('renders', async () => {
  //   const user = userEvent.setup()
  //   customRender(<Login />)

  //   expect(usernameInput).toHaveValue('user')
  //   expect(passwordInput).toHaveValue('password')
  //   await user.click(loginButton)
  //   await waitFor(() => expect(usernameInput).toHaveValue(''))
  //   expect(passwordInput).toHaveValue('')
  // })
  it('renders', async () => {
    const user = userEvent.setup()
    customRender(<LoginDialog />)
    const loginButton = screen.getByRole('button', {
      name: /login/i,
    })
    await user.click(loginButton)

    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const loginSubmitButton = screen.getByRole('button', {
      name: /login/i,
    })
    await user.type(usernameInput, 'user')
    await user.type(passwordInput, 'password')
    expect(usernameInput).toHaveValue('user')
    expect(passwordInput).toHaveValue('password')

    await user.click(loginSubmitButton)
    await waitFor(() => expect(usernameInput).not.toBeInTheDocument())
  })
})

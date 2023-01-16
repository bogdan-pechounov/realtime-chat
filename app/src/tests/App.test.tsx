import { render, screen } from '@testing-library/react'
import App from '~/App'
import { customRender } from './utils'

describe('App', () => {
  it('renders', async () => {
    window.HTMLElement.prototype.scrollIntoView = () => {}
    customRender(<App />)
    const username = await screen.findByRole('heading', { name: /user/i })
    expect(username).toBeInTheDocument()
  })
})

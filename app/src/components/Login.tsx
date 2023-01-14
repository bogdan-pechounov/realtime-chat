import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { LOGIN } from '../graphql/mutations'
import { ME } from '../graphql/queries'

function Login() {
  const [login] = useMutation(LOGIN)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await login({
      variables: { name, password },
      refetchQueries: [{ query: ME }],
    })
    setName('')
    setPassword('')
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='name'>Username</label>
      <input
        id='name'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login

import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { LOGIN, ME } from '../utils/queries'

function Login() {
  const [login] = useMutation(LOGIN)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    login({ variables: { name, password }, refetchQueries: [{ query: ME }] })
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='name'>Username</label>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login

import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useMutation } from '@apollo/client'
import { LOGIN } from '~/graphql/mutations'
import { useState } from 'react'
import { ME } from '~/graphql/queries'

export default function LoginDialog() {
  const [open, setOpen] = React.useState(false)
  const [login] = useMutation(LOGIN)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogin = async () => {
    await login({
      variables: { name, password },
      refetchQueries: [{ query: ME }],
    })
    handleClose()
  }

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If username is not taken, an account will be created.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Username'
            type='text'
            fullWidth
            variant='standard'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
            variant='standard'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

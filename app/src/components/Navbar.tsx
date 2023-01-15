import { AppBar, Box, Button, Hidden, Toolbar, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import { useMutation, useQuery } from '@apollo/client'
import { ME } from '~/graphql/queries'
import LoginDialog from './LoginDialog'
import { LOGOUT } from '~/graphql/mutations'
import Stack from '@mui/material/Stack'

type NavbarProps = {
  user: IUser | undefined | null
}

function Navbar({ user }: NavbarProps) {
  const [logout] = useMutation(LOGOUT)

  const handleLogout = async () => {
    logout({ refetchQueries: [{ query: ME }] })
  }

  return (
    <Box mb={0}>
      <AppBar position='sticky'>
        <Toolbar>
          <Box mr={2}>
            <ChatIcon fontSize='large' />
          </Box>
          <Typography variant='h5' sx={{ flexGrow: 1 }}>
            Chat App
          </Typography>
          {user ? (
            <Stack spacing={2} direction='row'>
              <Typography
                variant='h6'
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                {user.name}
              </Typography>
              <Button variant='contained' onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          ) : (
            <LoginDialog />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar

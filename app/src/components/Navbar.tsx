import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import { useMutation, useQuery } from '@apollo/client'
import { ME } from '~/graphql/queries'
import LoginDialog from './LoginDialog'
import { LOGOUT } from '~/graphql/mutations'
import Stack from '@mui/material/Stack'

function Navbar() {
  const { data } = useQuery<IMe>(ME)
  const [logout] = useMutation(LOGOUT)

  console.log(data?.me)

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
          {data?.me ? (
            <Stack spacing={2} direction='row'>
              <Typography variant='h6'>{data.me?.name}</Typography>
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

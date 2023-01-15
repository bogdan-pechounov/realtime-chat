import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import { useQuery } from '@apollo/client'
import { ME } from '~/graphql/queries'

function Navbar() {
  const { data } = useQuery<IMe>(ME)

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
          <Typography variant='h6'>{data?.me?.name}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar

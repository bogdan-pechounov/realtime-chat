import { useQuery } from '@apollo/client'
import Box from '@mui/material/Box'
import './App.css'
import Chat from './components/Chat'
import Navbar from './components/Navbar'
import { ME } from './graphql/queries'

function App() {
  const { data } = useQuery<IMe>(ME)

  return (
    <Box height='100vh' sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar user={data?.me} />
      <Chat user={data?.me} />
    </Box>
  )
}

export default App

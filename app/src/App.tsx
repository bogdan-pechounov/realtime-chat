import Box from '@mui/material/Box'
import './App.css'
import Chat from './components/Chat'
import Navbar from './components/Navbar'

function App() {
  return (
    <Box height='100vh' sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Chat />
    </Box>
  )
}

export default App

import './App.css'
import Login from './components/Login'
import { useQuery } from '@apollo/client'
import { ME } from './utils/queries'
import Message from './components/Message'
import MessageList from './components/MessageList'

function App() {
  const { data } = useQuery(ME)
  console.log(data)
  if (!data) return <p>Loading...</p>
  return (
    <div>
      <Login />
      <h1>{data.me.name}</h1>
      <MessageList />
      <Message />
    </div>
  )
}

export default App

import './App.css'
import Login from './components/Login'
import { useQuery } from '@apollo/client'
import { ME } from './utils/queries'

function App() {
  const { data } = useQuery(ME)
  console.log(data)
  if (!data) return <p>Loading...</p>
  return (
    <div>
      <Login />
      {data.me.name}
    </div>
  )
}

export default App

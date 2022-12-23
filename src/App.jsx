import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import File from './components/show-file/file'
import './styles/main.scss'

function App() {
  const {data} = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5050/')
      return res.data
    }
  })
  console.log(data)
  return (
    <div className="App">
      <p>asdasd</p>
      <File pdfs={data.pdfs} folders={data.folders} imgs={data.imgs}/>
    </div>
  )
}

export default App

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import File from './components/show-file/file'
import './styles/main.scss'

import { BsGrid1X2Fill, BsImageFill } from 'react-icons/bs'
import { FaFileUpload, FaFolderPlus, FaThList } from 'react-icons/fa'
import { useState } from 'react'
import { AiFillFolderAdd } from 'react-icons/ai'

function App() {
  const [file, setFile] = useState()
  const [uploadFile, setUploadFile] = useState(false)
  const [createFolder, setCreateFolder] = useState(false)
  const [viewToggle, setViewToggle] = useState(true)
  const [folderName, setFolderName] = useState('assets')
  const [folderHistory, setFolderHistory] = useState(['assets'])
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['data', folderName],
    queryFn: async () => {
      const res = await axios.post(`http://localhost:5050/`, {
        path: folderHistory.join('/')
      })
      return res.data
    }
  })
  const loadAgain = (name) => {
    setFolderHistory([...folderHistory, name])
    setFolderName(name)
    refetch()
  }

  const removeHistory = (name) => {
    setFolderName(name)
    refetch()
    setFolderHistory(folderHistory.slice(0, folderHistory.indexOf(name) + 1))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const name = e.target.folder.value;
    try {
      const res = await axios.post(`http://localhost:5050/create-folder`, {
        path: folderHistory.join('/'),
        name
      })
      setCreateFolder(false)
      refetch()
    } catch (err) {
      console.log(err)
    }
  }

  const fileChange = (e) => {
    let uploadedFile = e.target.files[0]
    uploadedFile['path'] = folderHistory.join('/')
    setFile(uploadedFile)
  }

  const submitUploadHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', file)
    formData.append('path', folderHistory.join('/'))
    try {
      const res = await axios.post(`http://localhost:5050/upload-file`, formData, {
        headers: {
          path: folderHistory.join('/')
        }
      })
      console.log(res)
      setUploadFile(false)
      refetch()
    } catch (err) {
      console.log(err)
    }
  }


  if (!isLoading) {
    return (
      <div className="container">
        <p className='title'>My Drive</p>
        <div className='info'>
          <p>My files list</p>
          {viewToggle ? <FaThList onClick={() => setViewToggle(!viewToggle)} className="icon" /> : <BsGrid1X2Fill onClick={() => setViewToggle(!viewToggle)} className="icon" />}
          <div className='create-icon'>
            <FaFolderPlus className='icon' onClick={() => setCreateFolder(!createFolder)} />
            <div className={createFolder ? 'create-folder-form' : 'hidden'}>
              <form onSubmit={submitHandler} className='submit-form'>
                <input type="text" name='folder' placeholder='Enter the name of folder' />
                <button className='btn btn-submit'>Create Folder</button>
              </form>
              <button onClick={() => setCreateFolder(false)} className='btn btn-cancel'>Cancel</button>
            </div>

            <FaFileUpload className='icon' onClick={() => setUploadFile(!uploadFile)} />
            <div className={uploadFile ? 'create-folder-form' : 'hidden'}>
              <form onSubmit={submitUploadHandler} className='submit-form'>
                <input type="file" name='file' onChange={fileChange}/>
                <button className='btn btn-submit'>Upload File</button>
              </form>
              <button onClick={() => setUploadFile(false)} className='btn btn-cancel'>Cancel</button>
            </div>
          </div>
        </div>
        <div className='navigate'>
          {
            folderHistory.map((el, id) => {
              return (
                <p key={id} onClick={() => removeHistory(el)}>{el} ~ </p>
              )
            })
          }
        </div>
        <File pdfs={data.pdfs} folders={data.folders} imgs={data.imgs} viewToggle={viewToggle} loadAgain={loadAgain} />
      </div>
    )
  }
}

export default App

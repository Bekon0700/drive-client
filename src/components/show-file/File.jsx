
import { BsGrid1X2Fill, BsImageFill } from 'react-icons/bs'
import { AiFillFolder, AiFillFilePdf } from 'react-icons/ai'

const File = ({ folders, imgs, pdfs, viewToggle, loadAgain }) => {
    return (
        <div className={viewToggle ? 'list-view' : 'grid-view'}>
            {
                folders.map((el, id) => <div onClick={() => loadAgain(el.fileName)} key={id} className='file-container flex-row file'>
                <AiFillFolder className='file-icon' />
                <p className='file-name'>{el.fileName}</p>
              </div>)
            }
            {
                imgs.map((el, id) => <div key={id} className='file-container flex-row'>
                <BsImageFill className='file-icon' />
                <a className='file-name' href={`http://localhost:5050/files/${el.path}`} target="_blank">{el.fileName}</a>
              </div>)
            }
            {
                pdfs.map((el, id) => <div key={id} className='file-container flex-row'>
                <AiFillFilePdf className='file-icon' />
                <a className='file-name' href={`http://localhost:5050/files/${el.path}`} target="_blank">{el.fileName}</a>
              </div>)
            }
          
        </div>
    )
}

export default File
import React from 'react'

const File = ({ folders, imgs, pdfs }) => {
    return (
        <div className='files-container'>
            <div className='container'>
                <p className='title'>Folders</p>
                <div className='names'>
                    {
                        folders.map((el, id) => <p key={id}>{el.fileName} - {el.path}</p>)
                    }
                </div>
            </div>
            <div className='container'>
                <p className='title'>Pdf</p>
                <div className='names'>
                    {
                        pdfs.map((el, id) => <p key={id}>{el.fileName} - {el.path}</p>)
                    }
                </div>
            </div>
            <div className='container'>
                <p className='title'>Images</p>
                <div className='names'>
                    {
                        imgs.map((el, id) => <p key={id}>{el.fileName} - {el.path}</p>)
                    }
                </div>
            </div>
        </div>
    )
}

export default File
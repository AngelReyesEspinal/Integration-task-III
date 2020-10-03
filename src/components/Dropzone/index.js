import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'

const droponeHeight = {
  height : 150,
}

const isNotDragging = {
  ...droponeHeight,
  border: '5px dashed black'
}

const isDragging = {
  ...droponeHeight,
  border: '5px dashed #3F51B5',
  backgroundColor: '#ecf0f1',
  color: '#3F51B5'
}

const contentStyle = {
  display: 'flex',
  justifyContent: 'center'
}

const fixedMt = {
  marginTop: 30
}

const Dropzone = (props) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        convertToBase64(reader.result)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})
  
  const convertToBase64 = (data) => {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(data)))
    emitBase64(base64)
  }

  const emitBase64 = (base64) => {
    props.addBase64(base64)
  }

  return (
    <div style={isDragActive ? isDragging : isNotDragging } {...getRootProps()}>
      <input {...getInputProps()} />
      <div style={contentStyle}>
        <div style={fixedMt}>
          {
            isDragActive 
            ? <h1>Suelta esa grasita 🔥</h1>
            : <h1>Seleccione o arrastre el archivo que desee almacenar</h1>
          }
        </div>
      </div>
    </div>
  )
}

export default Dropzone
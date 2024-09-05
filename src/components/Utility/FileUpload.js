import React, { useState } from "react"

function FileUpload({ onFileChange, acceptedType, returnOriginal }) {
  const [file, setFile] = useState("")

  const getBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (error) {
      // console.log('Error: ', error)
    }
  }
  const handleFileSelection = (event) => {
    event.preventDefault()

    if (event.target.files[0]) {
      getBase64(event.target.files[0], (result) => {
        setFile(event.target.files[0])
        if (returnOriginal) {
          onFileChange(event.target.files[0])
        } else {
          onFileChange(result)
        }
      })
    }
  }
  return (
    <div className="position-relative">
      <input type="file" onChange={(event) => handleFileSelection(event)} className="form-control" accept={acceptedType == "" ? "/*" : acceptedType} />


    </div>
  )
}

export default FileUpload

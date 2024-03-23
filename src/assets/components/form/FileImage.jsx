import { useState } from "react"
import { ReactComponent as ImageIcon } from "../..//svg/image.svg"
import { validateMaxFile } from "../../../lib/naFile"

function FileImage({ refFile, src, onChange }) {
  const [imgUrl, setUrl] = useState(src)
  const [currentFile, setFile] = useState(null)
  const [error, setError] = useState("")

  const info =
    "Maximum avatar image file size is 2MB, it's recommended that it has been cropped in a 1:1 ratio."
  const errorMsg = "Mate, the file size is too big! try another one"

  const changed = (e) => {
    if (onChange) onChange(e)

    const file = refFile.current.files[0]

    if (!file) return

    if (!validateMaxFile(file, 2)) {
      setError(errorMsg)
      refFile.current.files[0] = currentFile
      return
    }

    setFile(file)
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      return setUrl(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="form-file">
      <label htmlFor="uplod">
        {imgUrl ? (
          <img src={imgUrl} alt="uploaded image" />
        ) : (
          <div className="no-img">
            <ImageIcon />
          </div>
        )}
        <div className="desc">Profile image</div>
      </label>
      {error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <div className="info">{info}</div>
      )}
      <input
        type="file"
        ref={refFile}
        id="uplod"
        accept="image/*"
        onChange={changed}
      />
    </div>
  )
}

export default FileImage

import { ReactComponent as XIcon } from "../../svg/x.svg"

function ImageViewer({ setState, src }) {
  return (
    <div className="cover-bg">
      <div
        className="close-panel"
        onClick={() => {
          setState(false)
        }}
      ></div>
      <div className="modal-image-viewer">
        <button
          className="btn-close"
          onClick={() => {
            setState(false)
          }}
        >
          <XIcon />
        </button>
        <img src={src} alt="image" />
        {src.includes("https") && (
          <a href={src} target="_blank" rel="noreferrer">
            <button className="show-more">Open image source</button>
          </a>
        )}
      </div>
    </div>
  )
}

export default ImageViewer

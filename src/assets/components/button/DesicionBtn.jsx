
function Primary({ onClick, children }) {
  return (
    <button onClick={onClick} className="dsc-btn-primary">
      {children}
    </button>
  )
}

function Secondary({ onClick, children }) {
  return (
    <button onClick={onClick} className="dsc-btn-secondary">
      {children}
    </button>
  )
}

function Danger({ onClick, children }) {
  return (
    <button onClick={onClick} className="dsc-btn-danger">
      {children}
    </button>
  )
}

function DesicionBtn() {
  return <></>
}

DesicionBtn.Primary = Primary
DesicionBtn.Secondary = Secondary
DesicionBtn.Danger = Danger

export default DesicionBtn

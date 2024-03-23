import { ReactComponent as PlusIcon } from "../../svg/plus.svg"

function SideAdd({ onClick }) {
  return (
    <button className="btn-side-add" onClick={onClick}>
      <PlusIcon />
    </button>
  )
}

export default SideAdd

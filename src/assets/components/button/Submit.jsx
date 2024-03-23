import LoadingAnim from "../LoadingAnim"

function Submit({ onClick, state, children }) {
  return (
    <button
      className="btn-submit"
      type="submit"
      onClick={onClick}
      disabled={(state == "loading" || state == "disable") && true}
    >
      {state === "idle" || state === "disable"
        ? children
        : state == "loading" && <LoadingAnim />}
    </button>
  )
}

export default Submit

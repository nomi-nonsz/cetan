import { ReactComponent as Logout } from "../svg/exit.svg"

function TopBar({ img, username, email, triggerLogout, triggerBar }) {
  const toUserSettings = () => triggerBar("USER_SETTINGS")

  return (
    <div className="top-bar">
      <button className="user" onClick={toUserSettings}>
        <img src={img} alt="a user" />
        <div className="text">
          <div className="username">{username}</div>
          <div className="email">{email}</div>
        </div>
      </button>
      <button
        className="btn-logout"
        onClick={() => {
          triggerLogout(true)
        }}
      >
        <Logout />
      </button>
    </div>
  )
}

export default TopBar

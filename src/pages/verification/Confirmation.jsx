import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { auth } from "../../firebase"
import { AuthContext } from "../../contexts/AuthContext"

function Confirmation() {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const [status, setStatus] = useState("idle")
  const [errMsg, setError] = useState("")

  const toReset = () => navigate("/resetpassword")
  const toApp = () => navigate("/chats")

  const login = async () => {
    if (currentUser.uid) {
      navigate("/")
      return
    }

    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        const email = localStorage.getItem("emailVert")
        if (!email) {
          throw new Error(
            `Failed to confirm email, missing "email" item in localStorage`
          )
        }
        setStatus("pending")

        const result = await signInWithEmailLink(
          auth,
          email,
          window.location.href
        )

        console.log(result.user)
        setStatus("success")
      }
    } catch (error) {
      console.error(error)
      setStatus("error")
      if (error.message) {
        setError("Firebase Error: " + error.message)
      } else {
        setError(error)
      }
    }
  }

  useEffect(() => {
    login()
  }, [])

  return (
    <div className="form-fadder">
      <div className="form-n-container">
        <div className="form-n-wrapper" style={{ width: "400px" }}>
          <form className="form-control">
            <h2 className={status == "error" ? "text-danger" : ""}>
              {status == "pending"
                ? "Email confirmed"
                : errMsg.length > 0
                  ? "Error!!"
                  : "Login successfully"}
            </h2>
            {status == "error" ? (
              <div>{errMsg}</div>
            ) : (
              <div>
                {status == "pending"
                  ? "Trying to log in..."
                  : "You can reset the password now or continue to the app"}
              </div>
            )}
            {status == "success" && (
              <div className="flex flex-1-1">
                <button className="dsc-btn-primary" onClick={toReset}>
                  Reset Password
                </button>
                <button className="dsc-btn-secondary" onClick={toApp}>
                  Open chat
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Confirmation

import { onAuthStateChanged } from "@firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

const INIT_VALUE = {
  currentUser: {
    uid: null,
    email: null,
    displayName: null,
    imgURL: null,
  },
  refresh: () => {},
}

export const AuthContext = createContext(INIT_VALUE)

export function AuthContextProvider({ children }) {
  const [currentUser, setUser] = useState(INIT_VALUE.currentUser)
  const [count, setCount] = useState(0)

  // idk whatever react lifecycle is
  const refresh = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      console.log(user)
    })
  }, [count])

  return (
    <AuthContext.Provider value={{ currentUser, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

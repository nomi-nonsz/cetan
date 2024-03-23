import { createContext, useContext, useEffect, useReducer } from "react"
import { AuthContext } from "./AuthContext"

const INITIAL_STATE = {
  sender: null,
  replier: null,
  chatId: null,
  status: null,
}

export const ChatContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
})

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          sender: {
            uid: currentUser.uid,
            username: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          },
          replier: action.payload.replier,
          chatId: action.payload.chatId,
          status: action.payload.status,
        }
      case "RESET_USER":
        return INITIAL_STATE
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  useEffect(() => {
    // debug stuff
    // console.log(state)
    // if (state) {
    //   if (state.status === "BLOCKED") {
    //     console.log(`You're blocked by ${state.replier.username}`)
    //   }
    //   // setReplierStatus(state.replier, state.sender, "CLEAR");
    // }
  }, [state])

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}

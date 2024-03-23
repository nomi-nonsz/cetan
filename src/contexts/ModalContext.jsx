import { createContext, useState } from "react"

export const ModalContext = createContext({})

const DEFAULT_ACTION_VALUE = {
  state: false,
  payload: () => {},
}

export function ModalContextProvider({ children }) {
  const [deleteContact, setDeleteContact] = useState(DEFAULT_ACTION_VALUE)
  const [deleteChat, setDeleteChat] = useState(DEFAULT_ACTION_VALUE)
  const [blockChat, setBlockChat] = useState(DEFAULT_ACTION_VALUE)

  const [viewImage, setView] = useState({
    state: false,
    url: "",
  })

  return (
    <ModalContext.Provider
      value={{
        deleteContact,
        setDeleteContact,
        deleteChat,
        setDeleteChat,
        blockChat,
        setBlockChat,
        viewImage,
        setView,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

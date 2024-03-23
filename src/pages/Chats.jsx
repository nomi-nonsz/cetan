import { useContext, useState } from "react"

import { ViewportContext } from "../contexts/ViewportContext"
import { AuthContext } from "../contexts/AuthContext"
import { ChatContext } from "../contexts/ChatContext"
import { ModalContext } from "../contexts/ModalContext"

import TopBar from "../assets/components/TopBar"
import ChatTop from "../assets/components/ChatTop"
import ChatsBody from "../assets/components/ChatsBody"
import MsgInput from "../assets/components/MsgInput"
import AddContact from "../assets/components/modal/AddContact"
import SideAdd from "../assets/components/button/SideAdd"
import ConfLogout from "../assets/components/modal/ConfLogout"
import ChatIntro from "../assets/components/ChatIntro"
import Contacts from "../assets/components/Contacts"
import UserSettings from "../assets/components/settings/UserSettings"
import Confirmation from "../assets/components/modal/Confirmation"
import ImageViewer from "../assets/components/modal/ImageViewer"

function Chats() {
  // contexts
  const { currentUser } = useContext(AuthContext)
  const { state } = useContext(ChatContext)

  // Modals data
  const {
    deleteContact,
    setDeleteContact,
    deleteChat,
    setDeleteChat,
    blockChat,
    setBlockChat,
    viewImage,
    setView,
  } = useContext(ModalContext)

  const { isMobile } = useContext(ViewportContext)

  // toggle chat layout for mobile
  const [stateChat, setStateChat] = useState(false)

  // chat out state
  const [chatOutState, setChatOut] = useState("")

  // the user data from database
  const [contacts, setContacts] = useState([])

  // toggle modal
  const [showAdd, setShowAdd] = useState(false)
  const [showLogout, setLogout] = useState(false)

  const goBack = async () => {
    setStateChat(false)
    setChatOut("")
  }

  return (
    <>
      {showAdd == true && (
        <AddContact setVisible={setShowAdd} contacts={contacts} />
      )}
      {deleteContact.state && (
        <Confirmation
          title={"Delete contact"}
          message={"Are you sure you want to delete this contact?"}
          accept={deleteContact.payload}
          reject={() => {
            setDeleteContact({
              state: false,
              payload: () => {},
            })
          }}
        />
      )}
      {blockChat.state && (
        <Confirmation
          title={"Block contact"}
          message={"Are you sure you want to block this contact?"}
          accept={blockChat.payload}
          reject={() => {
            setBlockChat({
              state: false,
              payload: () => {},
            })
          }}
        />
      )}
      {deleteChat.state && (
        <Confirmation
          title={"Delete message"}
          message={"Are you sure you want to delete this message?"}
          accept={deleteChat.payload}
          reject={() => {
            setDeleteChat({
              state: false,
              payload: () => {},
            })
          }}
        />
      )}
      {viewImage.state && (
        <ImageViewer
          setState={(state) => {
            setView({
              state,
              url: viewImage.url,
            })
          }}
          src={viewImage.url}
        />
      )}
      <div className="chats">
        <div
          className="side-chats"
          style={isMobile ? { flex: stateChat ? 0 : 1 } : {}}
        >
          <div className="side-wrapper">
            {currentUser ? (
              <>
                <TopBar
                  img={currentUser.photoURL}
                  username={currentUser.displayName}
                  email={currentUser.email}
                  triggerLogout={setLogout}
                  triggerBar={(state) => {
                    setChatOut(state)
                    setStateChat(true)
                  }}
                />
                {showLogout == true && <ConfLogout setVisible={setLogout} />}
                <Contacts
                  setParentContacts={setContacts}
                  triggerChange={setStateChat}
                />
                <SideAdd
                  onClick={() => {
                    setShowAdd(true)
                  }}
                />
              </>
            ) : (
              <div className="no-user">Not Signed yet</div>
            )}
          </div>
        </div>
        <div
          className="main-chat"
          style={isMobile ? { flex: stateChat ? 1 : 0 } : {}}
        >
          {currentUser ? (
            <div className="chat-wrapper">
              {chatOutState === "USER_SETTINGS" ? (
                <UserSettings triggerBack={goBack} />
              ) : state.chatId && state.replier && state.sender ? (
                <>
                  <ChatTop triggerChange={setStateChat} />
                  <ChatsBody />
                  <MsgInput />
                </>
              ) : (
                <ChatIntro />
              )}
            </div>
          ) : (
            <div className="no-user"></div>
          )}
        </div>
      </div>
    </>
  )
}

export default Chats

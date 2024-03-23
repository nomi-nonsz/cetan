import { useContext, useEffect, useRef, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../firebase"

import { AuthContext } from "../../../contexts/AuthContext"
import { setContact } from "../../../controllers/contacts"

import UserItem from "../UserItem"
import { ReactComponent as CloseIcon } from "../../svg/x.svg"

function AddContact({ setVisible, contacts }) {
  const { currentUser } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [filterUser, setFilter] = useState([])
  const queryRef = useRef(null)

  const getAllUsers = async () => {
    const result = query(
      collection(db, "users"),
      where("username", "!=", currentUser.displayName)
    )

    const qs = await getDocs(result)
    const usrs = []
    qs.forEach((doc) => {
      const data = doc.data()
      if (!contacts.some((c) => c.uid === data.uid)) {
        usrs.push(data)
      }
    })

    setUsers(usrs)
    setFilter(usrs)
  }

  const watchSearch = () => {
    const q = queryRef.current.value
    const filtered = users.filter(({ username }) => {
      if (q.length > 0) return username.toLowerCase().includes(q.toLowerCase())
      return true
    })

    setFilter(filtered)
  }

  // get all user then displayed on add contacts
  useEffect(() => {
    currentUser.uid && getAllUsers()
  }, [currentUser.uid])

  const handleAddContact = async (uid, setState) => {
    setState("loading")

    try {
      await setContact(currentUser, uid)
      const filteredUs = filterUser.filter((usr) => usr.uid !== uid)
      setFilter(filteredUs)
    } catch (error) {
      console.error(error)
    } finally {
      setState("idle")
    }
  }

  return (
    <div className="cover-bg">
      <div className="modal-add-contact">
        <button
          className="btn-close"
          onClick={() => {
            setVisible(false)
          }}
        >
          <CloseIcon />
        </button>
        <h2>Add Contact</h2>
        <div className="search-bar">
          <input
            type="text"
            ref={queryRef}
            onChange={watchSearch}
            placeholder="Search user..."
            id=""
          />
        </div>
        <div className="result-field">
          {filterUser.length > 0 ? (
            filterUser.map(({ email, username, photoURL, uid }) => (
              <UserItem
                uid={uid}
                img={photoURL}
                username={username}
                chat={email}
                addBtnClick={handleAddContact}
                key={uid}
              />
            ))
          ) : (
            <div className="no-user">No User found</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddContact

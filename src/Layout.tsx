import SideBar from "./components/SideBar"
import SearchModal from "./components/SearchModal"
import "./styles/layout.css"
import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAtom } from "jotai"
import { currentUserAtom } from "./modules/auth/current-user.state"
import { Navigate } from "react-router-dom"
import { useNoteStore } from "./modules/note/note.state"
import { noteRepository } from "./modules/note/note.repository"

export default function Layout() {
  const [currentUser] = useAtom(currentUserAtom)
  const [isLoading, setIsLoading] = useState(false)
  const noteStore = useNoteStore()

  const fetchNotes = async () => {
    setIsLoading(true)
    const notes = await noteRepository.find()
    noteStore.set(notes)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  if (!currentUser) {
    return <Navigate to="/signin" replace />
  }
  return (
    <div className="layout-container">
      {!isLoading && <SideBar />}
      <main className="layout-main">
        <Outlet />
      </main>
      <SearchModal />
    </div>
  )
}

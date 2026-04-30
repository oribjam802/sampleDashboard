import Item from "./Item"
import NoteList from "../NoteList"
import UserItem from "./UserItem"
import { FiPlus, FiSearch } from "react-icons/fi"
import { noteRepository } from "../../modules/note/note.repository"
import { useNoteStore } from "../../modules/note/note.state"
import { useNavigate } from "react-router-dom"

export default function SideBar() {
  const noteStore = useNoteStore()
  const navigate = useNavigate()

  const createNote = async () => {
    try {
      const newNote = await noteRepository.create({})
      noteStore.set([newNote])
      navigate(`notes/${newNote.id}`)
    } catch (error) {
      alert("ノートの作成に失敗しました。")
    }
  }
  return (
    <>
      <aside className="sidebar">
        <div>
          <div>
            <UserItem />
            <Item label="検索" icon={FiSearch} onClick={() => {}} />
          </div>
          <div className="sidebar-spacer">
            <NoteList />
            <Item label="ノートを作成" icon={FiPlus} onClick={createNote} />
          </div>
        </div>
      </aside>
      <div className="sidebar-placeholder"></div>
    </>
  )
}

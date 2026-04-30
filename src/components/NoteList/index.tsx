import { useNavigate } from "react-router-dom"
import { useNoteStore } from "../../modules/note/note.state"
import NoteItem from "./NoteItem"
import { noteRepository } from "../../modules/note/note.repository"
import { useState } from "react"
import type { Note } from "../../modules/note/note.entity"

interface Props {
  layer?: number
  parentId?: number
}

export default function NoteList({ layer = 0, parentId }: Props) {
  const noteStore = useNoteStore()
  const notes = noteStore.getAll()
  const [expanded, setExpanded] = useState<Map<number, boolean>>(new Map())
  const navigate = useNavigate()

  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.preventDefault() //親のイベント処理をなくす
    const newNote = await noteRepository.create({ parentId })
    console.log(newNote)
    noteStore.set([newNote])
    setExpanded((prev) => {
      const newExpanded = new Map(prev)
      newExpanded.set(parentId, true)
      return newExpanded
    })
    moveToDetail(newNote.id)
  }
  const fetchChildren = async (e: React.MouseEvent, note: Note) => {
    e.preventDefault()
    const children = await noteRepository.find({ parentId: note.id })
    if (children == null) return
    console.log(children)
    noteStore.set(children)
    setExpanded((prev) => {
      const newExpanded = new Map(prev)
      newExpanded.set(note.id, !prev.get(note.id))
      return newExpanded
    })
  }

  const moveToDetail = (noteId: number) => {
    navigate(`/notes/${noteId}`)
  }
  return (
    <>
      {notes
        .filter((note) => note.parentId == parentId)
        .map((note) => (
          <div key={note.id}>
            <NoteItem
              note={note}
              onCreate={(e) => createChild(e, note.id)}
              onExpand={(e) => fetchChildren(e, note)}
              onClick={() => moveToDetail(note.id)}
              layer={layer}
              expanded={expanded.get(note.id)}
            />
            {expanded.get(note.id) && (
              <NoteList layer={layer + 1} parentId={note.id} />
            )}
          </div>
        ))}
    </>
  )
}

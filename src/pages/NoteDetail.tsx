import TitleInput from "../components/TitleInput"
import "../styles/pages/note-detail.css"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNoteStore } from "../modules/note/note.state"
import { noteRepository } from "../modules/note/note.repository"
import { Editor } from "../components/Editor"

export default function NoteDetail() {
  const params = useParams()
  const id = parseInt(params.id!)
  const [isLoading, setIsLoading] = useState(false)
  const noteStore = useNoteStore()
  const note = noteStore.getOne(id)
  useEffect(() => {
    fetchOne()
  }, [id])

  const fetchOne = async () => {
    setIsLoading(true)
    const note = await noteRepository.findOne(id)
    noteStore.set([note])
    setIsLoading(false)
  }

  const updateNote = async (
    id: number,
    note: { title?: string; content?: string },
  ) => {
    const updateNote = await noteRepository.update(id, note)
    noteStore.set([updateNote])
    return updateNote
  }

  if (isLoading) return <div />
  if (!note) return <div>記事ないよ</div>

  return (
    <div className="note-detail-container">
      <div className="note-detail-content">
        <TitleInput
          initialData={note}
          onTitleChange={(title) => updateNote(id, { title })}
        />
        <Editor
          initialContent={note.content}
          onChange={(content) => updateNote(id, { content })}
        />
      </div>
    </div>
  )
}

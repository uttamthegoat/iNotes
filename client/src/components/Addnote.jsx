import React, { useContext, useState } from "react";
import { NoteContext } from "../context/notes/NoteState";

export default function Addnote() {
  const { allnotes, setAllnotes, addNote } = useContext(NoteContext);

  const [note, setNote] = useState({ title: "", description: "" });

  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description);
    setNote({ title: "", description: "" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="Home__addNote">
      <h1>Add a note</h1>
      <form className="container">
        <label htmlFor="note-title" className="fs-3">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter note title"
          name="title"
          value={note.title}
          onChange={onChange}
          id="note-title"
          className="Home__noteTitle"
          minLength={1}
          required
        />
        <label htmlFor="note-desc" className="fs-3">
          Description
        </label>
        <input
          type="text"
          placeholder="Enter note description"
          name="description"
          value={note.description}
          onChange={onChange}
          id="note-desc"
          className="Home__noteDesc"
          minLength={1}
          required
        />
        <button
          disabled={!note.title || !note.description}
          type="button"
          className="Home__addBtn"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

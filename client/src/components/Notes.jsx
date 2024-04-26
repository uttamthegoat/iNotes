import React, { useContext, useEffect, useRef } from "react";
import NoteItem from "./NoteItem";
import { NoteContext } from "../context/notes/NoteState";
import EditModal from "./EditModal";
import { useState } from "react";

export default function Note() {
  const closeModalRef = useRef(null);
  const [note, setNote] = useState({ title: "", description: "" });
  const { allnotes, fetchAllNotes, editNote } = useContext(NoteContext);
  const updateNote = (curnote) => {
    setNote(curnote);
  };
  const handleOnchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleUpdates = (e) => {
    e.preventDefault();
    editNote(note._id, note.title, note.description);
    closeModalRef.current.click();
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);
  return (
    <>
      {/* Modal */}
      <EditModal
        note={note}
        handleOnchange={handleOnchange}
        handleUpdates={handleUpdates}
        closeModalRef={closeModalRef}
      />

      <h1>Your notes</h1>
      <div className="row w-100 g-0">
        {allnotes.map((note) => {
          return (
            <div key={note._id} className="col-sm-6 col-md-4 col-lg-3">
              <NoteItem note={note} updateNote={updateNote} />
            </div>
          );
        })}
      </div>
    </>
  );
}

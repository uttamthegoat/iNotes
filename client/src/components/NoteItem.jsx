import React, { useContext } from "react";
import "../styles/NoteItem.css";
import { NoteContext } from "../context/notes/NoteState";

export default function NoteItem(props) {
  const { deleteNote } = useContext(NoteContext);

  const { _id, title, description } = props.note;
  const { updateNote } = props;
  return (
    <div className="NoteItem">
      <div className="NoteItem__showNoteTitle">
        <span className="text-muted">Title:- </span>
        {title}
      </div>
      <div className="NoteItem__showNoteDesc text-wrap">
        <span className="text-muted fs-6">Description:- </span>
        {description}
      </div>
      <div className="d-flex justify-content-around NoteItem__operations">
        <i
          className="fa-solid fa-pen-to-square"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => updateNote(props.note)}
        ></i>
        <i className="fa-solid fa-trash" onClick={() => deleteNote(_id)}></i>
      </div>
    </div>
  );
}

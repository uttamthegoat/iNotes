import { createContext, useState } from "react";
export const NoteContext = createContext();
const NoteState = (props) => {
  let host = "https://inotes-server.vercel.app";
  const auth_token = localStorage.getItem("token");

  const [allnotes, setAllnotes] = useState([]);

  // fetch all notes
  const fetchAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth_token,
      },
    });
    const data = await response.json();
    setAllnotes(data.notes);
  };

  // add a note
  const addNote = async (title, description) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token": auth_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const data = await response.json();
    const newNotes = fetchAllNotes();
  };

  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": auth_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    fetchAllNotes();
  };

  // edit a note
  const editNote = async (id, title, description) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": auth_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, description }),
    });
    const data = response.json();
    fetchAllNotes();
  };

  return (
    <NoteContext.Provider
      value={{
        allnotes,
        setAllnotes,
        fetchAllNotes,
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

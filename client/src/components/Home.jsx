import React, { useEffect } from "react";
import "../styles/Home.css";
import Notes from "./Notes";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    document.title = "iNotes - Home";
  }, []);

  return (
    <div className="Home container-sm">
      <Addnote />

      <div className="Home__allNotes">
        <Notes />
      </div>
    </div>
  );
}

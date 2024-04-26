import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    document.title = "iNotes - About";
  }, []);
  return <div>This is about page</div>;
}

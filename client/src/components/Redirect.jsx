import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Redirect() {
  useEffect(() => {
    document.title = "iNotes - Error";
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">404 Error</h1>
      <hr />
      <div className="text-center">
        <h2>Page not found</h2>
        <Link
          to="/"
          className="mx-auto text-primary"
          style={{ textDecoration: "none" }}
        >
          Go back to Home Page
        </Link>
      </div>
    </div>
  );
}

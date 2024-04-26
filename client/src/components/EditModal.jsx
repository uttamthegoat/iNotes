import React from "react";
import { useRef } from "react";

export default function EditModal(props) {
  const { note, handleOnchange, handleUpdates, closeModalRef } = props;
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="title" className="mt-3">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                id="title"
                value={note.title}
                onChange={handleOnchange}
                placeholder="Enter the new title"
                minLength={1}
                required
              />
              <label htmlFor="description" className="mt-3">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                name="description"
                id="description"
                value={note.description}
                onChange={handleOnchange}
                placeholder="Enter the new description"
                minLength={1}
                required
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeModalRef}
              >
                Close
              </button>
              <button
              disabled={!note.title || !note.description}
                type="button"
                className="btn btn-primary"
                onClick={handleUpdates}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const {
  fetchallnotes,
  addnote,
  updatenote,
  deletenote,
} = require("../controllers/notes");

// Route 1: Get all the notes : GET /api/notes/fetchallnotes : Login required
router.get("/fetchallnotes", fetchuser, fetchallnotes);

// Route 2: Create a notes : POST /api/notes/addnote : Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title cannot be empty").isLength({ min: 1 }),
    body("description", "Description must be added").isLength({ min: 1 }),
  ],
  addnote
);

// Route 3 : Update a note : PUT /api/notes/update/:id
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "Title cannot be empty").isLength({ min: 1 }),
    body("description", "Description must be added").isLength({ min: 1 }),
  ],
  updatenote
);

// Route 4 : Delete a note : DELETE /api/notes/deletenote/:id : Login Required
router.delete("/deletenote/:id", fetchuser, deletenote);

router.get("/everynotes", async (req, res) => {
  try {
    const allNotes = await Notes.find();
    res.json({ success: true, notes: allNotes, message: "fetched all notes" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;

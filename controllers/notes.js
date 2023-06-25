const Notes = require("../models/Notes");
const { validationResult } = require("express-validator");

const fetchallnotes = async (req, res) => {
  try {
    const allNotes = await Notes.find({ user: req.user.id });
    res.json({ success: true, notes: allNotes, message: "fetched all notes" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const addnote = async (req, res) => {
  try {
    // Check for empty inputs: if so throw errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, errors: validationErrors.array() });
    }

    const { title, description } = req.body;
    // create new note
    const newnote = await Notes.create({
      title,
      description,
      user: req.user.id,
    });
    res.json({ success: true, note: newnote, message: "Added a note" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const updatenote = async (req, res) => {
  try {
    const { title, description } = req.body;
    // create a newnote object
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    // find a note to be updated and update it (find it by using id)
    let updatednote = await Notes.findById(req.params.id);
    if (!updatednote) {
      return res.status(404).send("Not found");
    }
    // check if the user is authorised
    if (updatednote.user.toString() !== req.user.id) {
      return res.status(401).send("you are not authorised");
    }
    updatednote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({
      success: true,
      note: updatednote,
      message: "Note Edited successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};
const deletenote = async (req, res) => {
  try {
    // find if note exists
    let note = await Notes.findById(req.params.id);
    console.log(note);
    if (!note) {
      return res.status(404).json({
        success: false,
        note: note,
        message: "No such note found",
      });
    }

    // check if the user is authorised
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("you are not authorised");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      note: note,
      message: "Deleted note successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { fetchallnotes, addnote, updatenote, deletenote };
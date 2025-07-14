import { notes } from "../server.js";

export const addNotes = (req, res) => {
  try {
    const { title, content } = req.body;
    if (title.trim().length === 0) {
      throw new Error("Title cannot be empty");
    }
    if (content.trim().length === 0) {
      throw new Error("content cannot be empty");
    }
    const id = Date.now();
    const timeStamp = new Date().toISOString();
    const note = {
      id: id,
      title: title,
      content: content,
      creadtedAt: timeStamp,
    };
    notes.push(note);
    console.log(notes);
    res.status(201).json(notes);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add notes", details: err.message });
  }
};

export const getAllNotes = (req, res) => {
  try {
    res.status(200).json(notes);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get all notes", details: err.message });
  }
};

export const getNoteById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const resultNote = notes.filter((note) => note.id === id);
    res.status(200).json(resultNote);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get the note", details: err.message });
  }
};

export const updateNoteById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    const targetNote = notes.find((note) => note.id === id);
    if (title !== undefined) {
      if (title.trim().length === 0) {
        return res.status(400).json({ error: "Title cannot be empty" });
      }
      targetNote.title = title;
    }

    if (content !== undefined) {
      if (content.trim().length === 0) {
        return res.status(400).json({ error: "Content cannot be empty" });
      }
      targetNote.content = content;
    }

    res.json({ message: "Note updated", note: targetNote });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get the note", details: err.message });
  }
};

export const deleteNodeById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = notes.findIndex((note) => note.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Note not found" });
    }
    notes.splice(index, 1);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete the note", details: err.message });
  }
};

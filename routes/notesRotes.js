import express from "express";
import {
  addNotes,
  deleteNodeById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from "../controllers/notesController.js";

export const notesRouter = express.Router();

notesRouter.post("/add", addNotes);
notesRouter.get("/all", getAllNotes);
notesRouter.get("/:id", getNoteById);
notesRouter.patch("/:id", updateNoteById);
notesRouter.delete("/:id", deleteNodeById);

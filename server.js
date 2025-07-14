import express from "express";
import { notesRouter } from "./routes/notesRotes.js";

const app = express();
const PORT = 8000;

export const notes = [];

app.use(express.json());

app.use("/notes", notesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "route not found" });
});

app
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });

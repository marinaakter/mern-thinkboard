import Note from "../models/Note.js";
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt: -1}) // sort for newest first data
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ messege: "Internal Server Error " });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ messege: "Note not found" })
    res.json(note)
  } catch (error) {
    console.log("Error in getNoteById controller", error);
    res.status(500).json({ messege: "Internal Server Error " });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ messege: "Note created successfully" });
  } catch (error) {
    console.log("Error in createNote controller", error);
    res.status(500).json({ messege: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );
    if (!updateNote) {
      return res.status(404).json({ messege: "Not not found" });
    }
    res.status(200).json({ messege: "Note updated successfully" });
  } catch (error) {
    console.log("Error in updateNote controller", error);
    res.status(500).json({ messege: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id)
    if (!deleteNote) return res.status(404).json({ messege: "Note not found" })
    res.status(200).json({messege:"Note deleted Successfully"})
  } catch (error) {
    console.log("Error in deleteNote controller", error);
    res.status(500).json({ messege: "Internal Server Error" });
  }
}

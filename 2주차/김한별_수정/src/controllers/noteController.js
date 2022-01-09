import Note from "../models/note";

export const getMain = (req, res, next) => {
  return res.render("home");
};

export const saveNote = async (req, res, next) => {
  const { title, description } = req.body;
  const note = await Note.create({
    title,
    description,
  });

  return res.json({ result: "ok", message: "note is saved", note });
};

export const getNotes = async (req, res, next) => {
  const notes = await Note.find({});
  return res.json({ result: "ok", notes });
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.body;
    await Note.findByIdAndDelete(noteId);
    return res.json({ result: "ok", message: "note is deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error" });
  }
};

export const editNote = async (req, res, next) => {
  try {
    const { title, description, id: noteId } = req.body.note;
    await Note.findByIdAndUpdate(noteId, {
      title,
      description,
    });
    return res.json({ result: "ok", message: "note is updated" });
  } catch (error) {
    console.log(error);
  }
};

export const getEditNote = (req, res, next) => {
  const noteId = req.query.id;

  return res.render("edit", { noteId });
};

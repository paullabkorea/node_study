import Note from "../models/note";

export const getMain = async (req, res, next) => {
  const notes = await Note.find({});

  return res.render("home", notes);
};

export const saveNote = async (req, res, next) => {
  const { title, body: description } = req.body;
  await Note.create({
    title,
    description,
  });

  return res.json({ result: "ok", message: "note is saved" });
};

export const getNotes = async (req, res, next) => {
  const notes = await Note.find({});
  return res.json({ result: "ok", notes });
};

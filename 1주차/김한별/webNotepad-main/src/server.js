import "dotenv/config";
import express from "express";
import logger from "morgan";
import { getMain, saveNote, getNotes } from "./controllers/noteController";
import "./db";

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", getMain);
app.get("/notes", getNotes);
app.post("/create", saveNote);

const handleListen = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListen);

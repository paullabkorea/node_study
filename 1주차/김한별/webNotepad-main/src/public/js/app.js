const noteContainer = document.querySelector(".note-container");
const modalContainer = document.querySelector(".modal-container");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const BASE_URI = "http://localhost:4000";

class Note {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Math.random();
  }
}

// UI updates on pug
function addNoteToList(note) {
  const newUINote = document.createElement("div");
  newUINote.classList.add("note");
  newUINote.innerHTML = `
    <span hidden>${note.id}</span>
    <h2 class="note_title">${note.title}</h2>
    <p class="note_body">${note.body}</p>
    <div class="note_button_box">
      <button class="note_button note_view">View Detail</button>
      <button class="note_button note_delete">Delete Note</button>
      <button class="note_button note_download">Download Note</button>
    </div>
  `;
  noteContainer.appendChild(newUINote);
}

async function getNotes() {
  const request = await fetch(`${BASE_URI}/notes`, {
    method: "GET",
  });
  const data = await request.json();
  return data;
}

const addNotesToDb = async (note) => {
  try {
    const request = await fetch(`${BASE_URI}/create`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};

// Function: Show alert message
function showAlertMessage(message, alertClass) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `message ${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement("beforebegin", alertDiv);
  title.focus();
  setTimeout(() => alertDiv.remove(), 2000);
}

// Event: note form submit
function handleForm(event) {
  event.preventDefault();
  const titleInput = document.querySelector("#title");
  const noteInput = document.querySelector("#note");

  // validate inputs
  if (titleInput.value.length > 0 && noteInput.value.length > 0) {
    const newNote = new Note(titleInput.value, noteInput.value);
    addNotesToDb(newNote);
    addNoteToList(newNote);
    titleInput.value = "";
    noteInput.value = "";
    showAlertMessage("Note successfully added", "success-message");
    titleInput.focus();
  } else {
    showAlertMessage("required to wite title and description", "alert-message");
  }
}

async function displayNotes() {
  const requestNotes = await getNotes();
  const notes = await requestNotes.notes;
  notes.forEach((note) => {
    addNoteToList(note);
  });
}

function init() {
  displayNotes();
}

init();
form.addEventListener("submit", handleForm);

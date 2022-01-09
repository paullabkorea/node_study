const noteContainer = document.querySelector(".note-container");
const modalContainer = document.querySelector(".modal-wrapper");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const BASE_URI = "http://localhost:4000";

class Note {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

// UI updates on pug
function addNoteToList(note, noteId) {
  const newUINote = document.createElement("div");
  newUINote.classList.add("note");
  newUINote.innerHTML = `
    <span hidden>${noteId}</span>
    <h2 class="note_title">${note.title}</h2>
    <p class="note_body">${note.description}</p>
    <div class="note_button_box">
      <button class="note_button note_edit">edit Note</button>
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
    const noteId = await (await request.json()).note._id;

    return noteId;
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
async function handleForm(event) {
  event.preventDefault();
  const titleInput = document.querySelector("#title");
  const noteInput = document.querySelector("#note");

  // validate inputs
  if (titleInput.value.length > 0 && noteInput.value.length > 0) {
    const newNote = new Note(titleInput.value, noteInput.value);
    console.log(newNote, "check");
    const noteId = await addNotesToDb(newNote);
    addNoteToList(newNote, noteId);
    titleInput.value = "";
    noteInput.value = "";
    showAlertMessage("Note successfully added", "success-message");
    titleInput.focus();
  } else {
    showAlertMessage("required to wite title and description", "alert-message");
  }
}

function activateNoteModal(title, body) {
  const modalTitle = document.querySelector(".modal_title");
  const modalBody = document.querySelector(".modal_body");
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modalContainer.classList.add("active");
}

async function displayNotes() {
  const requestNotes = await getNotes();
  const notes = await requestNotes.notes;
  notes.forEach((note) => {
    addNoteToList(note, note._id);
  });
}

const deleteNotesToDb = async (noteId) => {
  try {
    const request = await fetch(`${BASE_URI}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId }),
    });
    const result = await request.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

async function handleNote(event) {
  const deleteNote = event.target.classList.contains("note_delete");
  const editNote = event.target.classList.contains("note_edit");
  if (deleteNote) {
    const currentNote = event.target.closest(".note");
    showAlertMessage("Your note will deleted", "delete-message");
    const noteId = currentNote.querySelector("span").textContent;
    const deleteRequest = await deleteNotesToDb(noteId);

    if (deleteRequest.result === "ok") {
      currentNote.remove();
    }
  }

  if (editNote) {
    const currentNote = event.target.closest(".note");
    showAlertMessage("Your note will edit", "success-message");
    const noteId = currentNote.querySelector("span").textContent;
    window.location.href = `/edit?id=${noteId}`;
}

form.addEventListener("submit", handleForm);
noteContainer.addEventListener("click", handleNote);

function init() {
  displayNotes();
}

init();

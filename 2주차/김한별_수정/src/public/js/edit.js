const form = document.querySelector("form");
const BASE_URI = "http://localhost:4000";

class Note {
  constructor(title, description, id) {
    this.title = title;
    this.description = description;
    this.id = id;
  }
}

function showAlertMessage(message, alertClass) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `message ${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement("beforebegin", alertDiv);
  title.focus();
  setTimeout(() => alertDiv.remove(), 2000);
}

const editNotesToDb = async (note) => {
  console.log(note, "note");
  try {
    const request = await fetch(`${BASE_URI}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note }),
    });
    const result = await request.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

async function handleForm(event) {
  event.preventDefault();
  const titleInput = document.querySelector("#title");
  const noteInput = document.querySelector("#note");

  if (titleInput.value.length > 0 && noteInput.value.length > 0) {
    showAlertMessage("Note successfully added", "success-message");
    titleInput.focus();
    const newNote = new Note(
      titleInput.value,
      noteInput.value,
      form.dataset.id
    );

    const requestEdit = await editNotesToDb(newNote);
    if (requestEdit.result === "ok") {
      window.location.href = "/";
    }
  } else {
    showAlertMessage("required to wite title and description", "alert-message");
  }
}

form.addEventListener("submit", handleForm);

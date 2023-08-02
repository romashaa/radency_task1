const notes = [
    { name: "Note 1", date: "2023-07-29", category: "Random Thought", content: "Content of Note 1" },
    { name: "Note 2", date: "2023-07-30", category: "Task", content: "Content of Note 2" },
    { name: "Note 3", date: "2023-07-31", category: "Random Thought", content: "Content of Note 3" },
    { name: "Note 4", date: "2023-08-01", category: "Idea", content: "Content of Note 4" },
    { name: "Note 5", date: "2023-08-02", category: "Task", content: "Content of Note 5" }
];
function populateTable() {
    const tbody = document.querySelector("#notesTable tbody");
    tbody.innerHTML = "";

    notes.forEach((note,index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${note.name}</td>
      <td>${note.date}</td>
      <td>${note.category}</td>
      <td>${note.content}</td>
      <td>
          <i data-toggle="modal" data-target="#modal" onclick="editRow(${index})" class="fa fa-pencil" aria-hidden="true"></i>
          <i class="fa fa-archive" aria-hidden="true"></i>
          <i onclick="deleteRow(${index})" class="fa fa-trash-o" aria-hidden="true"></i>
      </td>
    `;
        tbody.appendChild(row);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    populateTable();
});
const editButtons = document.querySelectorAll(".fa-pencil");
editButtons.forEach((editButton, index) => {
    editButton.onclick = () => editRow(index);
});
///////////////////////////////////////////////////////////
const newNoteButton = document.querySelector("#newNoteButton");
const modal = document.querySelector("#modal");
const closeButton = document.querySelector(".close");
const saveNoteButton = document.querySelector("#saveNoteButton");
const errorMessage = document.querySelector("#error-message");


    function deleteRow(index) {
        notes.splice(index, 1);
        populateTable();
    }

    /////////////////////////////////////////////////////////
    function clearFormFields() {
        document.querySelector("#taskName").value = "";
        document.querySelector("#taskDate").value = "";
        document.querySelector("#taskCategory").value = "";
        document.querySelector("#taskContent").value = "";
    }
    //////////////////////////////////////////////////////////
let currentNoteIndex = null;
///////////////////////////////////////////////////
function editRow(index) {
    console.log("fsdf")
    currentNoteIndex = index;
    const note = notes[index];
    document.getElementById("taskName").value = note.name;
    document.getElementById("taskDate").value = note.date;
    document.getElementById("taskCategory").value = note.category;
    document.getElementById("taskContent").value = note.content;
    modal.style.display = "block";
}



    newNoteButton.addEventListener("click", () => {
        currentNoteIndex = null;
        modal.style.display = "block";
        errorMessage.style.display = "none";
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        errorMessage.style.display = "none";
    });

    saveNoteButton.addEventListener("click", () => {
        const name = document.querySelector("#taskName").value;
        const date = document.querySelector("#taskDate").value;
        const category = document.querySelector("#taskCategory").value;
        const content = document.querySelector("#taskContent").value;

        if (name && date && category && content) {
            const newNote = { name, date, category, content };
            if (currentNoteIndex !== null) {
                // If currentNoteIndex is not null, it means we are editing an existing note
                notes[currentNoteIndex] = newNote;
            } else {
                // Otherwise, we are creating a new note
                notes.push(newNote);
            }
            populateTable();
            clearFormFields();
            modal.style.display = 'none';
            modal.classList.remove('show');
            let modalBackdrop = document.querySelector('.modal-backdrop');
            modalBackdrop.style.display = 'none';
        } else{
            errorMessage.style.display = "block";
        }
    });

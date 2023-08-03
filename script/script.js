const categories =[
    "Random Thought",
    "Task",
    "Idea"
]

const selectElement = document.getElementById('taskCategory');

categories.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.text = option;
    optionElement.value = option;
    selectElement.appendChild(optionElement);
});


const notes = [
    { name: "Note 1", date: "2023-07-29", category: categories[0], content: "Content of Note 1", dates:"32532", archived: false },
    { name: "Note 2", date: "2023-07-30", category: categories[2], content: "Content of Note 2", dates:"32532", archived: false },
    { name: "Note 3", date: "2023-07-31", category: categories[1], content: "Content of Note 3", dates:"32532", archived: false },
    { name: "Note 4", date: "2023-08-01", category: categories[0], content: "Content of Note 4", dates:"32532", archived: false },
    { name: "Note 5", date: "2023-08-02", category: categories[1], content: "Content of Note 5", dates:"32532", archived: false }
];
// const archivedNotes = [];
const archiveTable = document.querySelector("#archiveDiv");
function viewArchive(){
    archiveTable.style.display="block";
}
function closeArchive(){
    archiveTable.style.display="none";
}

function archiveRow(index) {
    notes[index].archived = true;
    populateArchivedTable();
    populateTable();
    updateCategoriesTable();
}

function unarchiveRow(index) {
    notes[index].archived = false;
    populateArchivedTable();
    populateTable();
    updateCategoriesTable();
}
function populateArchivedTable() {
    const tbody = document.querySelector("#archivedNotesTable tbody");
    tbody.innerHTML = "";

    notes.forEach((note, index) => {
        if (note.archived) {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${note.name}</td>
            <td>${note.date}</td>
            <td>${note.category}</td>
            <td>${note.content}</td>
            <td></td>
            <td>
                <i onclick="unarchiveRow(${index})" class="fa fa-undo" aria-hidden="true"></i>
            </td>
        `;
            tbody.appendChild(row);
        }
    });
}
/////////////////////////////////////////////////////////
function populateTable() {
    const tbody = document.querySelector("#notesTable tbody");
    tbody.innerHTML = "";

    notes.forEach((note,index) => {
        if (!note.archived) {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${note.name}</td>
              <td>${note.date}</td>
              <td>${note.category}</td>
              <td>${note.content}</td>
              <td>${note.dates}</td>
              <td>
                  <i data-toggle="modal" data-target="#modal" onclick="editRow(${index})" class="fa fa-pencil" aria-hidden="true"></i>
                  <i onclick="archiveRow(${index})" class="fa fa-archive" aria-hidden="true"></i>
                  <i onclick="deleteRow(${index})" class="fa fa-trash-o" aria-hidden="true"></i>
              </td>
        `;
            tbody.appendChild(row);
        }
    });
}
/////////////////////////////////////////////////////
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
        updateCategoriesTable();
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
        document.body.style.overflow = "auto";
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
            updateCategoriesTable();
            modal.style.display = 'none';
            modal.classList.remove('show');
            let modalBackdrop = document.querySelector('.modal-backdrop');
            modalBackdrop.style.display = 'none';
            document.body.style.overflow = "auto";
        } else{
            errorMessage.style.display = "block";
        }
    });

function updateCategoriesTable() {
    const categoriesTable = document.querySelector("#categoriesTable");
    const categories = {};

    notes.forEach((note) => {
        if (!note.archived) {
            if (!categories[note.category]) {
                categories[note.category] = {
                    active: 1,
                    archived: 0,
                };
            } else {
                categories[note.category].active++;
            }
        } else {
            if (!categories[note.category]) {
                categories[note.category] = {
                    active: 0,
                    archived: 1,
                };
            } else {
                categories[note.category].archived++;
            }
        }
    });

    // Clear the existing rows in the table body
    const tbody = categoriesTable.querySelector("tbody");
    tbody.innerHTML = "";

    // Populate the table with the updated category data
    Object.keys(categories).forEach((category) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${category}</td>
            <td>${categories[category].active}</td>
            <td>${categories[category].archived}</td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    populateTable();
    populateArchivedTable();
    updateCategoriesTable();
});
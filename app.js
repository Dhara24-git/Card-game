// DOM elements
const noteInput = document.getElementById('note-input');
const addNoteButton = document.getElementById('add-note');
const notesContainer = document.getElementById('notes-container');

// Event listener to add a note
addNoteButton.addEventListener('click', addNote);

// Function to add a note
function addNote() {
    const noteText = noteInput.value;

    if (noteText.trim() !== "") {
        const notes = getNotesFromStorage();
        notes.push(noteText);
        saveNotesToStorage(notes);
        renderNotes();
        noteInput.value = ''; // Clear input after adding
    } else {
        alert("Note cannot be empty!");
    }
}

// Function to render notes
function renderNotes() {
    const notes = getNotesFromStorage();
    notesContainer.innerHTML = '';

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

        const noteContent = document.createElement('p');
        noteContent.textContent = note;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-note');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(index);

        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(deleteButton);
        notesContainer.appendChild(noteDiv);
    });
}

// Function to delete a note
function deleteNote(index) {
    const notes = getNotesFromStorage();
    notes.splice(index, 1); // Remove the note at the index
    saveNotesToStorage(notes);
    renderNotes();
}

// Function to get notes from localStorage
function getNotesFromStorage() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// Function to save notes to localStorage
function saveNotesToStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Render notes on page load
document.addEventListener('DOMContentLoaded', renderNotes);


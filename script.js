const addNoteButton = document.getElementById('addNoteButton');
const notesContainer = document.getElementById('notesContainer');
const noteInput = document.getElementById('noteInput');
const addButton = document.getElementById('addButton');
const notesDisplay = document.getElementById('notesDisplay');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function displayNotes() {
    notesDisplay.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <p>${note.text}</p>
            <p class="timestamp">${note.timestamp}</p>
            <div class="note-actions" style="display: none;">
                <button class="edit-button" data-index="${index}" style="background-color: green; color: white;">Edit</button>
                <button class="delete-button" data-index="${index}" style="background-color: red; color: white;">Delete</button>
            </div>
        `;

        // Add the click event listener to each noteElement
        noteElement.addEventListener('click', (event) => {
            if (!event.target.classList.contains('edit-button') && !event.target.classList.contains('delete-button')) {
                const actions = noteElement.querySelector('.note-actions');
                actions.style.display = actions.style.display === 'block' ? 'none' : 'block';
            }
        });

        notesDisplay.appendChild(noteElement);
    });
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

addNoteButton.addEventListener('click', () => {
    if (notesContainer.style.display === 'none' || notesContainer.style.display === '') {
        notesContainer.style.display = 'block';
        noteInput.addEventListener('input', showAddButton);
    } else {
        notesContainer.style.display = 'none';
        noteInput.removeEventListener('input', showAddButton);
        addButton.style.display = 'none';
    }
});

function showAddButton() {
    if (noteInput.textContent.trim() !== '') {
        addButton.style.display = 'block';
    } else {
        addButton.style.display = 'none';
    }
}

addButton.addEventListener('click', () => {
    const noteText = noteInput.textContent;
    if (noteText.trim() !== '') {
        const timestamp = new Date().toLocaleString();
        notes.push({ text: noteText, timestamp: timestamp });
        saveNotes();
        displayNotes();
        noteInput.textContent = '';
        addButton.style.display = 'none';
        notesContainer.style.display = 'none';
    }
});

notesDisplay.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.dataset.index;
        notes.splice(index, 1);
        saveNotes();
        displayNotes();
    } else if (event.target.classList.contains('edit-button')) {
        const index = event.target.dataset.index;
        noteInput.textContent = notes[index].text;
        notes.splice(index, 1);
        saveNotes();
        displayNotes();
        notesContainer.style.display = 'block';
        addButton.style.display = 'block';
    }
});

displayNotes();
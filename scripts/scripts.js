const checkBoxButton = document.querySelectorAll('.toDoCheckbox');

const addNotesButton = document.getElementById('addNotesButton');

const transparentDiv = document.getElementById('transparentBackGround');

const addNotesDiv = document.getElementById('addNotesDiv')

const addNoteName = document.getElementById('addNoteName');

const addNoteDate = document.getElementById('addNoteDate');

const toDoList = document.querySelector('.list');

const addButton = document.getElementById('addButton');

const cancelButton = document.getElementById('cancelButton');

const switchDiv = document.querySelector('.switchDiv');

const exampleToDoBlock = document.querySelector('.toDoBlock');





const { DateTime } = luxon;

function updateCurrentDate() {
    const now = DateTime.local();
    const formattedDate = now.setLocale('ru').toFormat('EEEE, d MMMM');
    document.querySelector('.date h2').textContent = formattedDate;
}

updateCurrentDate();





document.querySelectorAll('.toDoCheckbox').forEach(button => {
    button.addEventListener('click', function () {
        this.classList.toggle('active');
    });
});

addNotesButton.addEventListener('click', () => {
    transparentDiv.style.display = 'flex';
    addNotesDiv.classList.add('visible'); 
});

cancelButton.addEventListener('click', () => {
    addNotesDiv.classList.remove('visible');
    setTimeout(() => {
        transparentDiv.style.display = 'none'; 
    }, 400); 
});




switchDiv.addEventListener('click', function() {
    switchDiv.classList.toggle('active');
});

function checkReminders() {
    const now = new Date();

    notes.forEach((note, index) => {
        const noteTime = new Date(note.date);

        if (noteTime <= now && note.reminderActive !== undefined && note.reminderActive) {
            alert(`Напоминание: ${note.text}`);

            const noteElements = document.querySelectorAll('.toDoBlock');

            noteElements.forEach((noteEl) => {

                if (noteEl.querySelector('.toDoBlockTitle').textContent === note.text) {
                    noteEl.style.backgroundColor = "#D0D0D0";
                }

            });

            notes[index].reminderActive = false;
            saveNotesToLocalStorage();
        }
    });
}




let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

addButton.addEventListener('click', () => {
    const noteText = addNoteName.value.trim();
    const noteDate = addNoteDate.value;
    const reminderActive = switchDiv.classList.contains('active');

    if (noteText === '' || noteDate === '') {
        alert('Заполните все поля!');
        return;
    }

    createNoteElement(noteText, noteDate, false, reminderActive);

    notes.push({
        text:noteText,
        date:noteDate,
        completed: false,
        reminderActive: reminderActive
    });

    saveNotesToLocalStorage();

    addNoteName.value = '';
    addNoteDate.value = '';
    switchDiv.classList.remove('active');

    addNotesDiv.classList.remove('visible');

    setTimeout(() => {
        transparentDiv.style.display = 'none';
    }, 400);
});

setInterval(checkReminders, 10000);

function createNoteElement(noteText, noteDate, isCompleted = false, reminderActive = false) {
    const newToDoBlock = document.createElement('div');
    newToDoBlock.classList.add('toDoBlock');

    const formattedDate = DateTime.fromISO(noteDate).setLocale('ru').toFormat("d MMMM, HH:mm");

    newToDoBlock.innerHTML = `
        <button class="toDoCheckbox">
            <span class="material-symbols-rounded button-icon">check</span>
        </button>
        <div class="toDoBlockData">
            <p class="toDoBlockDate">${formattedDate}</p>
            <p class="toDoBlockTitle">${noteText}</p>
        </div>
        <button class="deleteButton">
            <span class="material-symbols-outlined deleteicon">close</span>
        </button>
    `;

    const checkBoxButton = newToDoBlock.querySelector('.toDoCheckbox');
    if (isCompleted) {
        checkBoxButton.classList.add('active');
    }

    checkBoxButton.addEventListener('click', function() {
        this.classList.toggle('active');

        notes = notes.map(note =>
            note.text === noteText && note.date === noteDate ? {...note, completed: this.classList.contains('active')} : note
        );

        saveNotesToLocalStorage();

    });

    const deleteButton = newToDoBlock.querySelector('.deleteButton');
    deleteButton.addEventListener('click', function() {
        newToDoBlock.remove();

        notes = notes.filter(note => !(note.text === noteText && note.date === noteDate));
        saveNotesToLocalStorage();
    });
    
    toDoList.appendChild(newToDoBlock);
}

toDoList.addEventListener('click', function(event) {
    if (event.target.closest('.deleteButton')) {
        const noteBlock = event.target.closest('.toDoBlock');
        const noteTitle = noteBlock.querySelector('.toDoBlockTitle').textContent;

        notes = notes.filter(note => note.text !== noteTitle);
        saveNotesToLocalStorage();

        noteBlock.remove();
    }
});

window.addEventListener('load', () => {
    notes.forEach(note => createNoteElement(note.text, note.date, note.completed, note.reminderActive));
});




const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.trim().toLowerCase();
    const allNotes = document.querySelectorAll('.toDoBlock');

    allNotes.forEach(note => {
        const noteTitle = note.querySelector('.toDoBlockTitle').textContent.toLowerCase();

        if(noteTitle.includes(searchText)) {
            note.style.display = 'flex';
        } else{
            note.style.display = 'none';
        }
    });
});




const allButton = document.getElementById('buttonLeft');
const activeButton = document.getElementById('midButton');
const finishButton = document.getElementById('buttonRight');

function filterNotes(filter) {
    const allNotes  = document.querySelectorAll('.toDoBlock');

    allNotes.forEach(note => {
        const isCompleted = note.querySelector('.toDoCheckbox').classList.contains('active');

        if (filter === 'all') {
            note.style.display = 'flex';
        } else if (filter === 'active' && !isCompleted) {
            note.style.display = 'flex';
        } else if (filter === 'completed' && isCompleted) {
            note.style.display = 'flex';
        } else {
            note.style.display = 'none';
        }
    });
}

allButton.addEventListener('click', () => filterNotes('all'));
activeButton.addEventListener('click', () => filterNotes('active'));
finishButton.addEventListener('click', () => filterNotes('completed'));




document.addEventListener("DOMContentLoaded", () => {
    updateDateTime();
});

function updateDateTime() {
    const dateElement = document.querySelector('.date h2'); 
    const dayElement = document.querySelector('.date p');

    const now = new Date();

    const weekDay = dateFns.format(now, 'EEEE', { locale: dateFns.localeUk });
    const formattedDate = dateFns.format(now, 'd MMMM', { locale: dateFns.localeUk });

    dateElement.textContent = weekDay;
    dayElement.textContent = formattedDate;
}

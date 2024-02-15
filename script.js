const addBtn = document.getElementById('add');
const taskInput = document.getElementById('taskInput');
const taskContainer = document.getElementById('task');

const goBackBtn = document.getElementsByClassName('goBack');
const okBtn = document.getElementsByClassName('ok');

addBtn.addEventListener('click', addTask);

window.addEventListener('load', loadTasks);

function createTask(taskContent) {
    taskContainer.innerHTML += `
        <ul>
            <li>
                <button class="completed" onclick="Done(this)"><img src="./img/done.png" alt="done"></button>
                <span class="taskText">${taskContent}</span>
                <div class="buttons">
                    <button class="edit" onclick="editTask(this)"><img src="./img/edit-pen.png" alt="edit=pen"></button>
                    <button class="remove" onclick="removeTask(this)">x</button>
                </div>
            </li>
        </ul>
        <hr class="line">`;

    saveTasksToLocalStorage();
}

function addTask() {
    if (taskInput.value.trim() !== '') {
        let taskContent = taskInput.value;
        createTask(taskContent);
    }
    taskInput.value = '';
}

function editTask(clickedBtn) {
    const listItem = clickedBtn.closest('li');
    const taskText = listItem.querySelector('.taskText');

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.style.outline = 0;
    editInput.style.background = 'transparent';
    editInput.style.border = 'none';
    editInput.style.fontSize = '16px';
    editInput.style.padding = '10px';
    editInput.style.width = '300px';
    editInput.value = taskText.textContent;

    listItem.replaceChild(editInput, taskText);

    editInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter' && editInput.value.trim() !== '') {
            taskText.textContent = editInput.value;
            listItem.replaceChild(taskText, editInput);
            saveTasksToLocalStorage();
        }
    });

    editInput.focus();
}

function removeTask(clickedBtn) {
    const item = clickedBtn.closest('li');
    if (item) {
        const hrLine = document.querySelector('.line');
        item.remove();
        if (hrLine && hrLine.tagName === 'HR') {
            hrLine.remove();
        }
        saveTasksToLocalStorage();
    }
}

function Done(clickedBtn) {
    clickedBtn.style.backgroundColor = 'green';
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.taskText');
    
    taskItems.forEach(task => {
        tasks.push(task.textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    storedTasks.forEach(task => {
        createTask(task);
    });
}

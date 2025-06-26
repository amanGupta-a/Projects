const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Add task on button click or Enter key
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
    taskInput.value = '';

    // Complete task on click
    li.querySelector('.task-text').addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
    });
}

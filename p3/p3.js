const todoForm = document.getElementById('todo-form');
const taskList = document.getElementById('task-list');

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('task-description').value;

    addTask(taskTitle, taskDescription);
    todoForm.reset();
});

function addTask(title, description) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>${title}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        <form class="edit-form" style="display: none;">
            <input type="text" value="${title}">
            <input type="text" value="${description}">
            <button type="submit">Save</button>
        </form>
    `;
    taskList.appendChild(taskItem);

    const editForm = taskItem.querySelector('.edit-form');
    const editBtn = taskItem.querySelector('.edit-btn');
    const deleteBtn = taskItem.querySelector('.delete-btn');

    editBtn.addEventListener('click', function() {
        editForm.style.display = 'block';
        taskItem.querySelector('span').style.display = 'none';
    });

    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newTitle = editForm.querySelector('input[type="text"]').value;
        const newDescription = editForm.querySelectorAll('input[type="text"]')[1].value;
        taskItem.querySelector('span').textContent = newTitle;
        editForm.style.display = 'none';
        taskItem.querySelector('span').style.display = 'inline';
    });

    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
    });
}

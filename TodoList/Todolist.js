
document.addEventListener('DOMContentLoaded', function () {
    const todoList = [];
    const todoContainer = document.getElementById('todo-list');
    const todoInput = document.getElementById('newtask');
    const addButton = document.getElementById('addbtn');

    addButton.addEventListener('click', addTodo);
    todoContainer.addEventListener('click', handleTodoClick);

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            const todoItem = createTodoItem(todoText);
            todoList.push(todoItem);
            todoContainer.appendChild(todoItem);
            todoInput.value = '';
        }
    }

    function createTodoItem(text) {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';

        const span = document.createElement('span');
        span.textContent = text;
        span.className = 'todo-text';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        return li;
    }

    function handleTodoClick(event) {
        const target = event.target;
        const todoItem = target.parentElement;
        if (target.classList.contains('delete')) {
            const index = Array.from(todoContainer.children).indexOf(todoItem);
            todoList.splice(index, 1);
            todoItem.remove();
        } else if (target.classList.contains('edit')) {
            const span = todoItem.querySelector('.todo-text');
            const text = span.textContent;
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = text;
            editInput.className = 'edit-input';

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.className = 'save';

            const deleteButton = todoItem.querySelector('.delete');

            todoItem.insertBefore(editInput, span);
            todoItem.insertBefore(saveButton, deleteButton);

            span.style.display = 'none';
            target.style.display = 'none';

            saveButton.addEventListener('click', () => {
                span.textContent = editInput.value.trim();
                span.style.display = 'inline';
                target.style.display = 'inline';
                editInput.remove();
                saveButton.remove();
            });
        } else if (target.classList.contains('todo-checkbox')) {
            todoItem.classList.toggle('completed', target.checked);
        }
    }
});

const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Function to add a todo item
const addTodo = () => {
    const inputText = inputBox.value;
    if (inputText === '') {
        alert('You must write something');
        return false;
    }

    if (addBtn.value === 'Save') {
        // Update the edited todo item
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = 'Add';
        inputBox.value = '';
        editTodo = null;
        // Update the local storage with the edited data
        saveTodoList();
    } else {
        // Create a new todo item
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = inputText;
        li.appendChild(p);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('btn', 'editBtn');
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Remove';
        deleteBtn.classList.add('btn', 'deleteBtn');
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = '';
        // Save the todo list to local storage
        saveTodoList();
    }
};

// Function to handle the Remove and Edit buttons
const updateTodo = (e) => {
    if (e.target.innerHTML === 'Remove') {
        todoList.removeChild(e.target.parentElement);
        // Update the local storage after removing an item
        saveTodoList();
    }
    if (e.target.innerHTML === 'Edit') {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = 'Save';
        editTodo = e;
    }
};

// Function to save the todo list to local storage
const saveTodoList = () => {
    const todos = [];
    const todoItems = todoList.getElementsByTagName('li');
    for (const item of todoItems) {
        todos.push(item.getElementsByTagName('p')[0].innerHTML);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Function to load the todo list from local storage
const loadTodoList = () => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    for (const text of todos) {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = text;
        li.appendChild(p);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('btn', 'editBtn');
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Remove';
        deleteBtn.classList.add('btn', 'deleteBtn');
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    }
};

// Load the todo list when the page is initially loaded
loadTodoList();

// Add event listeners
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
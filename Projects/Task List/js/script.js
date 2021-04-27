// Define UI Elements
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_tasks_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// Define Event Listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearAll)
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

// Define Functions
// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert("Please Add a task!");
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);

        taskList.appendChild(li);

        storeTaskLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('Are you sure?')) {
            let ele = e.target.parentElement;
            ele.remove();
            removeFromLS(ele);
        }
    }
}

// Clear All Tasks
function clearAll() {
    if (taskList.children.length === 0) {
        alert("You don't have any task now.");
    } else {
        if (confirm('Are you sure to clear all tasks?')) {
            while (taskList.firstChild) {
                taskList.removeChild(taskList.firstChild);
            }
        }
    }
    localStorage.clear();
}

// Filter task
function filterTask(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

//Store Task in Local Storage
function storeTaskLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// get tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);

        taskList.appendChild(li);
    });
}

//Remove a task from Local Storage
function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
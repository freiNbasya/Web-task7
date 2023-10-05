const toDoList = document.getElementById("todo-list");
const newTask = document.getElementById("new-task");
let tasks = [];

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function updateList() {
    toDoList.innerHTML = "";

    tasks.sort((a, b) => b.timestamp - a.timestamp);

    for (const task of tasks) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = task.id;
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskStatus(task.id));
        const label = document.createElement("label");
        label.textContent = task.text + " (" + formatDate(task.timestamp) + ")";
        if (task.completed) {
            label.style.textDecoration = "line-through";
            label.style.color = "blue";
        }
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove task";
        removeButton.addEventListener("click", () => removeTask(task.id));
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(removeButton);
        toDoList.appendChild(li);
    }
}

function addTask() {
    const text = newTask.value.trim();
    if (text === "") return;
    const timestamp = new Date().getTime();
    const task = { id: timestamp, text, completed: false, timestamp };
    tasks.push(task);
    newTask.value = "";
    updateList();
}
function removeTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    updateList();
}


function toggleTaskStatus(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
        task.completed = !task.completed;
        updateList();
    }
}

function removeCompletedTasks() {
    tasks = tasks.filter((task) => !task.completed);
    updateList();
}

function removeUncompletedTasks() {
    tasks = tasks.filter((task) => task.completed);
    updateList();
}

updateList();

newTask.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

toDoList.addEventListener("dblclick", (event) => {
    const listItem = event.target.closest("li");
    if (!listItem) return;

    const label = listItem.querySelector("label");
    const text = prompt("Edit the task:", label.textContent);

    if (text !== null) {
        const id = parseInt(listItem.querySelector("input[type=checkbox]").id);
        const task = tasks.find((t) => t.id === id);
        if (task) {
            task.text = text;
            task.timestamp = new Date().getTime();
            updateList();
        }
    }
});
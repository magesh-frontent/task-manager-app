let tasks = [];

// Event Listeners
document.getElementById("addBtn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

// Add Task
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter task");
        return;
    }

    const taskObj = {
        text: text,
        completed: false
    };

    tasks.push(taskObj);
    saveTasks();
    renderTasks();

    input.value = "";
}

// Save to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks
function loadTasks() {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = stored;
    renderTasks();
}

// Render Tasks
function renderTasks() {
    const list = document.getElementById("taskList");
    const emptyMsg = document.getElementById("emptyMsg");

    list.innerHTML = "";

    if (tasks.length === 0) {
        emptyMsg.style.display = "block";
        return;
    } else {
        emptyMsg.style.display = "none";
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        // Complete Button
        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "✔️";
        completeBtn.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        // Remove Button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        // Edit Task
        span.ondblclick = () => {
            const newText = prompt("Edit task", task.text);
            if (newText) {
                tasks[index].text = newText;
                saveTasks();
                renderTasks();
            }
        };

        li.appendChild(completeBtn);
        li.appendChild(span);
        li.appendChild(removeBtn);

        list.appendChild(li);
    });
}

// Initial Load
loadTasks();
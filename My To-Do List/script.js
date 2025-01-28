// Get references to DOM elements
const addButton = document.getElementById("addTask");
const searchButton = document.getElementById("searchTask");
const clearButton = document.getElementById("clearSearch");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Variable to track the index of the task being edited
let currentTaskIndex = null;

// Load tasks from local storage when the page loads
loadTasks();

// Function to add or edit a task
function addTask() {
  const task = taskInput.value.trim();

  if (task) {
    if (currentTaskIndex !== null) {
      // Edit existing task
      const listItem = taskList.children[currentTaskIndex];
      const taskText = listItem.querySelector("span");
      taskText.textContent = task;
      currentTaskIndex = null;
    } else {
      // Create a new task
      createTaskElement(task);
    }
    taskInput.value = "";
    saveTasks();
  } else {
    alert("Please enter a task!");
  }
}

// Add event listener for the "Add" button
addButton.addEventListener("click", addTask);

// Add event listener for the "Enter" key in the task input
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Function to create a new task element
function createTaskElement(task, completed = false) {
  const listItem = document.createElement("li");

  // Create checkbox for task completion
  const checkbox = document.createElement("input");

  const div = document.createElement("div")
  checkbox.type = "checkbox";
  checkbox.classList = "checkbox"
  checkbox.addEventListener("change", function () {
    const taskText = listItem.querySelector("span");
    if (checkbox.checked) {
      // Mark task as completed and trigger confetti animation
      taskText.classList.add("completed");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      // Remove completed status
      taskText.classList.remove("completed");
    }
    saveTasks();
  });
  listItem.appendChild(checkbox);

  // Create span element for task text
  const taskText = document.createElement("span");
  if (completed) {
    checkbox.checked = true;
    taskText.classList.add("completed");
  }
  taskText.textContent = task;
  taskText.style.fontWeight = "700"
  listItem.appendChild(taskText);

  // Create edit button
  const editButton = document.createElement("button");
  editButton.addEventListener("click", function () {
    const taskText = listItem.querySelector("span");
    taskInput.value = taskText.textContent;
    currentTaskIndex = Array.from(taskList.children).indexOf(listItem);
  });
  editButton.textContent = "Edit";
  editButton.className = "button";
  editButton.style.backgroundColor = "#37A2E6"
  div.appendChild(editButton);

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "button";
  deleteButton.style.backgroundColor = "#664747"
  deleteButton.addEventListener("click", function () {
    taskList.removeChild(listItem);
    saveTasks();
  });
  div.appendChild(deleteButton);

  
  listItem.appendChild(div)
  // Append the new task to the task list
  taskList.appendChild(listItem);
}
// Function to save tasks to local storage
function saveTasks() {
  let tasks = [];
  taskList.querySelectorAll("li").forEach(function (item) {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const taskText = item.querySelector("span").textContent.trim();
    tasks.push({ text: taskText, completed: checkbox.checked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function (task) {
    createTaskElement(task.text, task.completed);
  });
}

//Function to search tasks.
function searchTask() {
  const searchTerm = taskInput.value.trim().toLowerCase();
  const tasks = taskList.querySelectorAll("li");
  let count = 0;
  clearButton.style.display = "inline"
  tasks.forEach(function (task) {
    const taskText = task.querySelector("span").textContent.toLowerCase();
    if (taskText.includes(searchTerm)) {
      task.style.display = "";
      count = count+1;
    } else {
      task.style.display = "none";
    }
  });
  console.log(count);
  if (count==0){
    alert('There are no items to search for.');
    taskInput.value ='';
    searchTask();
  }
}

//Funtion to clear tasks
function clearSearch() {
  taskInput.value ='';
    searchTask();
    clearButton.style.display = "none"
}
// Add event listener for the "Search" button
searchButton.addEventListener("click", searchTask);
clearButton.addEventListener("click", clearSearch);


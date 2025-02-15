import {
    saveToLocalStorageByName,
    getLocalStorage,
    removeFromLocalStorage,
  } from "./localStorage.js";
  

  const addTaskBtn = document.getElementById("addTaskBtn");
  const addTaskPopup = document.getElementById("addTaskPopup");
  const saveTaskBtn = document.getElementById("saveTaskBtn");
  const cancelTaskBtn = document.getElementById("cancelTaskBtn");
  const taskList = document.getElementById("taskList");
  const taskNameInput = document.getElementById("taskName");
  const taskDescriptionInput = document.getElementById("taskDescription");
  const taskStatusBtn = document.getElementById("taskStatusBtn");
  const taskStatusOptions = document.getElementById("taskStatusOptions");
  const priorityStatusBtn = document.getElementById("priorityStatusBtn");
  const priorityStatusOptions = document.getElementById("priorityStatusOptions");
  const dueDateInput = document.getElementById("dueDate");
  
 
  addTaskBtn.addEventListener("click", () => {
    addTaskPopup.classList.remove("hidden");
  });
  
  cancelTaskBtn.addEventListener("click", () => {
    addTaskPopup.classList.add("hidden");
    clear();
  });
  
  saveTaskBtn.addEventListener("click", () => {
    saveTask();
  });
  
  taskStatusBtn.addEventListener("click", () => {
    taskStatusOptions.classList.toggle("hidden");
  });
  
  priorityStatusBtn.addEventListener("click", () => {
    priorityStatusOptions.classList.toggle("hidden");
  });
  

  taskStatusOptions.addEventListener("click", (e) => {
    const status = e.target.innerText;
    taskStatusBtn.innerText = `Task Status: ${status}`;
    taskStatusOptions.classList.add("hidden");
  });
  
  priorityStatusOptions.addEventListener("click", (e) => {
    const priority = e.target.innerText;
    priorityStatusBtn.innerText = `Priority: ${priority}`;
    priorityStatusOptions.classList.add("hidden");
  });
  

  
 
  function saveTask() {
    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    const taskStatus = taskStatusBtn.innerText.replace("Task Status: ", "");
    const priorityStatus = priorityStatusBtn.innerText.replace("Priority: ", "");
    const dueDate = dueDateInput.value;
  
    
      const task = {
        name: taskName,
        description: taskDescription,
        status: taskStatus,
        priority: priorityStatus,
        dueDate: dueDate,
      };
  
      
  
     
      saveToLocalStorageByName(task);
      getTasks();
      clear();
      addTaskPopup.classList.add("hidden");
    
  }
  
  function clear() {
    taskNameInput.value = "";
    taskDescriptionInput.value = "";
    taskStatusBtn.innerText = "Task Status: ";
    priorityStatusBtn.innerText = "Priority: ";
    dueDateInput.value = "";
  }
  
  function getTasks() {
    taskList.innerHTML = "";
    const tasks = getLocalStorage("tasks");
  
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const taskCard = document.createElement("div");
      taskCard.className = "bg-white p-4 rounded-lg border border-gray-300";
      taskCard.innerHTML = `
        <h3 class="text-lg font-bold">${task.name}</h3>
        <p class="text-gray-600">${task.description}</p>
        <p class="text-sm text-gray-500">Status: ${task.status}</p>
        <p class="text-sm text-gray-500">Priority: ${task.priority}</p>
        <p class="text-sm text-gray-500">Due Date: ${task.dueDate}</p>
        <button id="deleteBtn${i}" class="bg-red-500 text-white px-2 py-1 rounded-md mt-2">Delete</button>
      `;
      taskList.appendChild(taskCard);
  
    
      const deleteBtn = document.getElementById(`deleteBtn${i}`);
      deleteBtn.addEventListener("click", () => {
        removeFromLocalStorage("tasks", i); 
        getTasks(); 
      });
    }
  }
  
  
 
  getTasks();
  
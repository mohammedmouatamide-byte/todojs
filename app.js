// EXERCICE: compléter toutes les parties TODO

// Données
let tasks = [];           // tableau des tâches
let currentFilter = "all"; // "all" | "active" | "done"

// DOM
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const counter = document.querySelector("#counter");

const filterBtns = document.querySelectorAll(".filter-btn");
const clearDoneBtn = document.querySelector("#clearDoneBtn");
const clearAllBtn = document.querySelector("#clearAllBtn");

// LocalStorage
const STORAGE_KEY = "todo_smart_tasks_v1";

function save() {
  // TODO: sauvegarder tasks dans localStorage (JSON)
  function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

}

function load() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      tasks = [];
      return;
    }

    tasks = JSON.parse(data);

    // sécurité : vérifier que c'est bien un tableau
    if (!Array.isArray(tasks)) {
      tasks = [];
    }

  } catch (error) {
    console.error("Erreur lors du chargement des tâches :", error);
    tasks = [];
  }
}

function getVisibleTasks() {
  // TODO: retourner la liste filtrée selon currentFilter
  // - all => toutes
  // - active => done === false
  // - done => done === true
  switch (currentFilter) {
    case "active":
      return tasks.filter(t => !t.done);
    case "done":
      return tasks.filter(t => t.done);
    default:
      return tasks;
  }
}

function updateCounter() {
  // TODO: calculer le nombre de tâches non terminées
  // et mettre à jour le texte du compteur
  const count = tasks.filter(t => !t.done).length;
  counter.textContent = `${count} tâche(s) restante(s)`;
}

function createTaskElement(task) {
  // TODO: créer et retourner un <li> avec :
  // - class "item" (+ "done" si task.done)
  // - une checkbox liée à toggleTask(task.id)
  // - un <span class="text"> avec le texte
  // - un bouton "Supprimer" lié à deleteTask(task.id)
  const li = document.createElement("li");
  li.className = "item" + (task.done ? " done" : "");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const span = document.createElement("span");
  span.className = "text";
  span.textContent = task.text;

  const btn = document.createElement("button");
  btn.textContent = "Supprimer";
  btn.addEventListener("click", () => deleteTask(task.id));

  li.append(checkbox, span, btn);
  return li;
}

function render() {
  // TODO:
  // - vider taskList
  // - récupérer les tâches visibles (getVisibleTasks)
  // - pour chaque tâche visible => append createTaskElement
  // - updateCounter
  taskList.innerHTML = "";

  const visibleTasks = getVisibleTasks();
  visibleTasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });

  updateCounter();
}

function addTask(text) {
  // TODO:
  // - trim + refuser vide
  // - créer un objet tâche { id, text, done:false }
  // - l’ajouter à tasks
  // - save() puis render()
  const value = text.trim();
  if (!value) return;

  const task = {
    id: Date.now(),
    text: value,
    done: false
  };

  tasks.push(task);
  save();
  render();

}

function toggleTask(id) {
  // TODO:
  // - retrouver la tâche par id
  // - inverser done
  // - save() puis render()
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  task.done = !task.done;
  save();
  render();
}

function deleteTask(id) {
  // TODO:
  // - supprimer la tâche du tableau
  // - save() puis render()
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function setActiveFilterButton(activeBtn) {
  // TODO:
  // - retirer "is-active" de tous les boutons
  // - ajouter "is-active" à activeBtn
  filterBtns.forEach(btn => btn.classList.remove("is-active"));
  activeBtn.classList.add("is-active");
}

// Events
addBtn.addEventListener("click", () => {
  // TODO:
  // - addTask(taskInput.value)
  // - vider le champ + focus
  addTask(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

taskInput.addEventListener("keydown", (e) => {
  // TODO:
  // - si e.key === "Enter" => même action que le bouton Ajouter
  if (e.key === "Enter") {
    addTask(taskInput.value);
    taskInput.value = "";
    taskInput.focus();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // TODO:
    // - currentFilter = btn.dataset.filter
    // - setActiveFilterButton(btn)
    // - render()
    currentFilter = btn.dataset.filter;
    setActiveFilterButton(btn);
    render();
  });
});

clearDoneBtn.addEventListener("click", () => {
  // TODO:
  // - supprimer toutes les tâches terminées
  // - save() puis render()
  tasks = tasks.filter(t => !t.done);
  save();
  render();
});

clearAllBtn.addEventListener("click", () => {
  // TODO:
  // - vider tasks
  // - save() puis render()
  tasks = [];
  save();
  render();
});

// Init
load();
render();


let tasks = [];

const tasksList = document.querySelector(".js-tasksSection__tasksList");
const tasksNavigation = document.querySelector(".js-tasksSection__navigation");
let toggleDoneSpanTextContent = "Ukryj ukończone";

const hideOrShowTasks = () => {
  if (toggleDoneSpanTextContent === "Ukryj ukończone") {
    toggleDoneSpanTextContent = "Pokaż ukończone";
    resetTasksList();
    render();
    renderNavElements();
    selectAndAddListenersToNavSpans();
  } else if (toggleDoneSpanTextContent === "Pokaż ukończone") {
    toggleDoneSpanTextContent = "Ukryj ukończone";
    resetTasksList();
    render();
    renderNavElements();
    selectAndAddListenersToNavSpans();
  }
};

const resetTasksList = () => {
  tasksList.innerHTML = "";
};

const toggleTaskDone = (index) => {
  tasks = [
    ...tasks.slice(0, index),
    {
      ...tasks[index],
      done: ![...tasks][index].done,
    },
    ...tasks.slice(index + 1),
  ];
};

const finishAllTasks = () => {
  tasks = [...tasks];
  [...tasks].forEach((task) => (task.done = true));
  bindEvents();
  renderNavElements();
  selectAndAddListenersToNavSpans();
};

const removeTaskFromTasksArray = (index) => {
  tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
};

const bindEvents = () => {
  resetTasksList();
  render();
};

const toggleCheckButton = () => {
  const tasksListItemCheckButtons = document.querySelectorAll(
    ".tasksListItem__checkButton"
  );
  tasksListItemCheckButtons.forEach((taskButton, index) => {
    taskButton.addEventListener("click", () => {
      toggleTaskDone(index);
      bindEvents();
      renderNavElements();
      selectAndAddListenersToNavSpans();
    });
  });
};

const removeTask = () => {
  const tasksListItemRemoveButtons = document.querySelectorAll(
    ".tasksListItem__removeButton"
  );
  tasksListItemRemoveButtons.forEach((task, index) => {
    task.addEventListener("click", () => {
      removeTaskFromTasksArray(index);
      bindEvents();
      renderNavElements();
      selectAndAddListenersToNavSpans();
    });
  });
};

const selectAndAddListenersToNavSpans = () => {
  const toggleDoneSpan = document.querySelector(".tasksSection__toggleDone");
  if (toggleDoneSpan !== null) {
    toggleDoneSpan.addEventListener("click", hideOrShowTasks);
  }
  const finishAllSpan = document.querySelector(".tasksSection__finishAll");
  if (finishAllSpan !== null) {
    finishAllSpan.addEventListener("click", finishAllTasks);
  }
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const newTaskInput = document.querySelector(".js-form__newTaskInput");
  newTaskInput.focus();
  const newTask = { content: newTaskInput.value.trim(), done: false };
  if (!newTask.content) return;
  tasks = [...tasks, newTask];
  bindEvents();
  renderNavElements();
  selectAndAddListenersToNavSpans();
  newTaskInput.value = "";
};

const init = () => {
  const form = document.querySelector(".js-form");
  form.addEventListener("submit", onFormSubmit);
  render();
  renderNavElements();
  selectAndAddListenersToNavSpans();
};

const toggleHidden = () => {
  const tasksListItems = document.querySelectorAll(".tasksListItem");
  if (toggleDoneSpanTextContent === "Pokaż ukończone") {
    tasksListItems.forEach((item) => {
      if (item.firstElementChild.innerHTML !== "") {
        item.classList.add("hidden");
      }
    });
  }
  if (toggleDoneSpanTextContent === "Ukryj ukończone") {
    tasksListItems.forEach((item) => {
      if (item.firstElementChild.innerHTML !== "") {
        item.classList.remove("hidden");
      }
    });
  }
};

const render = () => {
  const checkIcon = `<i class="fa-solid fa-check"></i>`;
  tasks.forEach((task) => {
    tasksList.innerHTML += `<li class="tasksListItem">
        <button class="tasksListItem__checkButton">${
          task.done ? checkIcon : ""
        }</button>
        <span class="${task.done ? "tasksListItem__contentSpan--done" : ""}
          tasksListItem__contentSpan">${task.content}
        </span>
        <button class="tasksListItem__removeButton">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </li>`;
  });

  toggleHidden();
  toggleCheckButton();
  removeTask();
};

const renderNavElements = () => {
  if (tasksList.innerHTML === "") {
    tasksNavigation.innerHTML = `<h2 class="tasksSection__header">Lista zadań</h2>`;
  } else if (tasksList.innerHTML !== "") {
    tasksNavigation.innerHTML = `
    <h2 class="tasksSection__header">Lista zadań</h2>
    <span class="tasksSection__toggleDone"
    >${toggleDoneSpanTextContent}</span>
    <span class="tasksSection__finishAll ${
      tasks.every((task) => task.done === true) ? "notActive" : ""
    }"
    >Ukończ wszystkie</span>`;
  }
};

init();
selectAndAddListenersToNavSpans();

const tasks = [
  {
    content: "Zrobić zadanie domowe",
    done: true,
  },
  {
    content: "zdobyć pracę jako front-end developer",
    done: false,
  },
  {
    content: 'zagrać w "Dominant species: Władcy Ziemi"',
    done: false,
  },
];

const tasksList = document.querySelector(".js-tasksSection__tasksList");

const render = () => {
  const checkIcon = `<i class="fa-solid fa-check"></i>`;
  tasks.forEach((task) => {
    tasksList.innerHTML += `<li class="tasksListItem">
      <button class="tasksListItem__checkButton">${
        task.done ? checkIcon : ""
      }</button>
      <span class="${task.done ? "tasksListItem__contentSpan--linethrough" : ""}
        tasksListItem__contentSpan">${task.content}
      </span>
      <button class="tasksListItem__removeButton">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </li>`;
  });

  toogleCheckButton();
  removeTask();
};

const resetTasksList = () => {
  tasksList.innerHTML = "";
};

const toggleTaskDone = (index) => {
  tasks[index].done = !tasks[index].done;
};

const removeTaskFromTasksArray = (index) => {
  tasks.splice(index, 1);
};

const bindEvents = () => {
  resetTasksList();
  render();
};

const toogleCheckButton = () => {
  const tasksListItemCheckButtons = document.querySelectorAll(
    ".tasksListItem__checkButton"
  );
  tasksListItemCheckButtons.forEach((task, index) => {
    task.addEventListener("click", () => {
      toggleTaskDone(index);
      bindEvents();
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
    });
  });
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const newTaskInput = document.querySelector(".js-form__newTaskInput");
  newTaskInput.focus();
  const newTask = { content: newTaskInput.value.trim(), done: false };
  if (!newTask.content) return;
  tasks.push(newTask);
  bindEvents();
  newTaskInput.value = "";
};

const init = () => {
  const form = document.querySelector(".js-form");
  render();
  form.addEventListener("submit", onFormSubmit);
};

init();

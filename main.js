const tasks = [
  {
    content: "Zrobić zadanie domowe",
    done: false,
  },
  {
    content: "Zostać programistą",
    done: false,
  },
  {
    content: 'zagrać w "Dominant species: Władcy Ziemi"',
    done: false,
  },
];

const tasksList = document.querySelector(".tasksList");
const newTaskInput = document.querySelector(".js-form__newTask");
const form = document.querySelector(".form");

const checkIcon = `<i class="fa-solid fa-check"></i>`;

const render = () => {
  tasks.forEach((task) => {
    tasksList.innerHTML += `<li class="taskContainer">
    <button class="taskContainer__check">
    ${task.done ? checkIcon : ""}</button>
    <span
      
    class="${
      task.done ? "taskContainer__content--linethrough" : ""
    } taskContainer__content">${task.content}</span>
    <button class="taskContainer__remove"><i class="fa-regular fa-trash-can"></i></button>
  </li>`;
  });

  toogleDoneButton();
  removeTaskButton();
};

const toogleDoneButton = () => {
  const taskContainerCheckButtons = document.querySelectorAll(
    ".taskContainer__check"
  );
  console.log(taskContainerCheckButtons);
  taskContainerCheckButtons.forEach((item, index) => {
    item.addEventListener("click", () => {
      console.log(tasks[index].content);
      tasks[index].done = !tasks[index].done;
      console.log(tasks);
      tasksList.innerHTML = "";
      render();
    });
  });
};

const removeTaskButton = () => {
  const taskContainerRemoveButtons = document.querySelectorAll(
    ".taskContainer__remove"
  );
  taskContainerRemoveButtons.forEach((item, index) => {
    item.addEventListener("click", () => {
      console.log(item);
      tasks.splice(index, 1);
      tasksList.innerHTML = "";
      render();
    });
  });
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const newTask = { content: newTaskInput.value.trim(), done: false };
  if (!newTask.content) return;
  tasks.push(newTask);
  tasksList.innerHTML = "";
  render();
};

const init = () => {
  render();
  form.addEventListener("submit", onFormSubmit);
};

init();

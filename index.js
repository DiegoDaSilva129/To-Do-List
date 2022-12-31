const tagColors = {
  'learning code': 'blue',
  'personal work': 'green',
  'life': 'purple',
  'job': 'orange',
};
let todoList;

window.onload = () => {
  updateTodoList();
};

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();

  const project = document.getElementById('project').value;
  const item = document.getElementById('item').value;
  const tag = document.getElementById('tag-select').value;

  if (!project || !item) {
    // Display error message or alert
    return;
  }

  const todoListFromStorage = JSON.parse(localStorage.getItem('todoList')) || [];
  todoListFromStorage.push({ project, item, tag });
  localStorage.setItem('todoList', JSON.stringify(todoListFromStorage));

  updateTodoList();

  document.getElementById('project').value = '';
  document.getElementById('item').value = '';
});

function updateTodoList() {
  const todoListFromStorage = JSON.parse(localStorage.getItem('todoList')) || [];
  todoList = todoListFromStorage.slice();
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  todoList.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" name="selected-items" value="${index}" data-index="${index}"> <span class="${tagColors[item.tag]}">${item.project}</span>: <br>${item.item}`;
    todoListElement.appendChild(li);

    const checkboxInput = li.querySelector('input[type="checkbox"]');
    checkboxInput.addEventListener('change', (event) => {
      event.target.parentElement.classList.toggle('completed');
    });
  });

  const removeButton = document.getElementById('remove');
  removeButton.addEventListener('click', () => {
    const selectedItems = todoListElement.querySelectorAll('input[type="checkbox"]:checked');
    const indices = Array.from(selectedItems).map((item) => parseInt(item.getAttribute('data-index'), 10));
    todoList = todoList.filter((_, i) => !indices.includes(i));
    localStorage.setItem('todoList', JSON.stringify(todoList));
    updateTodoList();
  });
}

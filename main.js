const inputTodo = document.getElementById('input-todo');
const createButon = document.getElementById('create-button')
const radioStatusElements = document.getElementsByName('status');
const todoContainerUl = document.getElementById('todo-container');

radioStatusElements.forEach((item, index) => {
  item.addEventListener('change', showTodos);
});

createButon.addEventListener('click', (event) => {
  // 入力内容の取得
  const title = inputTodo.value;
  if (!title) {
    alert('入力は必須です');
    return;
  }

  // 入力内容をTodoデータ保持
  createTodo(title)

  // 入力内容のリセット
  inputTodo.value = '';

  showTodos();
});

function getCurrentStatus() {
  let currentStatus = undefined;
  radioStatusElements.forEach((item, index) => {
    if(item.checked) {
      currentStatus = item.value;
    }
  });

  return currentStatus;
}

function showTodos() {
  todoContainerUl.textContent = '';

  const currentStatus = getCurrentStatus();
  const todos = filterTodos(currentStatus);

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.textContent = `${todo.id}: ${todo.title} (状態: ${getNameByStatus(todo.status)})`;
    appnedStatusButtonsTo(li, todo.id);
    appendDeleteButtonTo(li, todo.id);
    todoContainerUl.appendChild(li);
  });
}


function appnedStatusButtonsTo(appendTarget, todoId) {
  const notWorkButton = document.createElement('button');
  const workingButton = document.createElement('button');
  const doneButton = document.createElement('button');

  notWorkButton.textContent = '未着手';
  workingButton.textContent = '作業中';
  doneButton.textContent = '完了';

  appendTarget.appendChild(notWorkButton);
  appendTarget.appendChild(workingButton);
  appendTarget.appendChild(doneButton);

  notWorkButton.addEventListener('click', () => {
    updateStatus(todoId, STATUS_TYPES.NOT_START);
    showTodos();
  });

  workingButton.addEventListener('click', () => {
    updateStatus(todoId, STATUS_TYPES.WORKING);
    showTodos();
  });

  doneButton.addEventListener('click', () => {
    updateStatus(todoId, STATUS_TYPES.DONE);
    showTodos();
  });
}

function appendDeleteButtonTo(appendTarget, todoId) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除'
  deleteButton.addEventListener('click', () => {
    deleteTodo(todoId);
    showTodos();
  });
  appendTarget.appendChild(deleteButton);
}
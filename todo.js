const STATUS_TYPES = {
  ALL: 'all',
  NOT_START: 'not-start',
  WORKING: 'working',
  DONE: 'done',
};

let nextTodoId = 1;
const todos = [];

function createTodo(title) {
  const todo = {
    id: nextTodoId++,
    title,
    status: STATUS_TYPES.NOT_START
  };

  todos.push(todo);
}

function updateStatus(id, statusType) {
  const targetTodo = todos.find(todo => {
    return todo.id === id;
  });
  if (!targetTodo) {
    alert(`id:${id} に紐付けデータはありません`);
    return;
  }

  targetTodo.status = statusType;
}

function deleteTodo(id) {
  const targetIndex = todos.findIndex(todo => {
    return todo.id === id;
  });
  todos.splice(targetIndex, 1);
}

function filterTodos(statusType) {
  if(statusType === STATUS_TYPES.ALL) {
    return [...todos];
  }

  return todos.filter(todo => {
    return todo.status === statusType;
  });
}

function getNameByStatus(statusType) {
  if (statusType === STATUS_TYPES.NOT_START) {
    return '未着手';
  } else if (statusType === STATUS_TYPES.WORKING) {
    return '作業中';
  } else if (statusType === STATUS_TYPES.DONE) {
    return '完了';
  }
}
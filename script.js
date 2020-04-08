//variables
let todos = []
//Element storage
$addBtn = $('#new-task')
$newTaskInput = $('#new-task-input')
$addTask = $('#add-task')
$taskList = $('#todo-list')

//Click listeners
$addBtn.on('click', showForm)
$addTask.on('click', addTask)

//Functions
//on page load, get list of todos from localstorage
$(document).ready(function(){
    todos = JSON.parse(localStorage.getItem('todos'))
    if (!todos) todos = [];
    renderList()
})

//Show add todo button and input
function showForm(){
    $newTaskInput.toggleClass('hidden')
    $addTask.toggleClass('hidden')
    $addBtn.toggleClass('hidden')
}

//add todo to list and save to local storage
function addTask(){
    //update localstorage
    todos.push({
        item: $newTaskInput.val(),
        done: false
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    //add to ui
    renderList()
    $newTaskInput.val('')
    $newTaskInput.toggleClass('hidden')
    $addTask.toggleClass('hidden')
    $addBtn.toggleClass('hidden')
}

function toggleTodo(num) {
    return (() => {
        todos[num].done = !todos[num].done
        localStorage.setItem('todos', JSON.stringify(todos))
        renderList()
    })
}

function deleteTodo(num) {
    return (() => {
        todos.splice(num, 1)
        localStorage.setItem('todos', JSON.stringify(todos))
        renderList()
    })
}

function renderList() {
    $taskList.empty()
    for (i=0; i< todos.length; i++) {
        let newTask = $(`<li id='task-${i}' class='${todos[i].done ? 'done' : ''}'>
            ${todos[i].item}
            &nbsp&nbsp&nbsp&nbsp&nbsp
            <button id='delete-${i}'>X</button>
        </li>`)
        $taskList.append(newTask)
        $(`#task-${i}`).on('click', toggleTodo(i))
        $(`#delete-${i}`).on('click', deleteTodo(i))
    }
}

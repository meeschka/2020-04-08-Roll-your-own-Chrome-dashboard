//Variables
let todos = []

//Element storage
$addBtn = $('#new-task')
$newTaskInput = $('#new-task-input')
$addTask = $('#add-task')
$taskList = $('#todo-list')
$linkList = $('#link-list')

//Click listeners
$addBtn.on('click', showForm)
$addTask.on('click', addTask)



//on page load, get list of todos from localstorage
$(document).ready(function(){
    todos = JSON.parse(localStorage.getItem('todos'))
    if (!todos) todos = [];
    renderList()

    chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
        updateLinkList(bookmarkTreeNodes)
    });
})


//Functions
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

//toggle todo state (done or not done)
function toggleTodo(num) {
    return (() => {
        todos[num].done = !todos[num].done
        localStorage.setItem('todos', JSON.stringify(todos))
        renderList()
    })
}

//delete todo
function deleteTodo(num) {
    return (() => {
        todos.splice(num, 1)
        localStorage.setItem('todos', JSON.stringify(todos))
        renderList()
    })
}

//update list of links based on users bookmarks
function updateLinkList(tree) {
    let bookmarks = tree[0]['children'][0]['children']
    if (bookmarks.length > 0) {
        $linkList.empty()
        for (i=0; i<bookmarks.length; i++) {
            let bookmark = $(`<li id='bookmark-${i}'>
                <a href='bookmark[i].url'>${bookmarks[i].title}</a>
            </li>`)
            $linkList.append(bookmark)
        }
    }
    
}

//rerender todo list
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


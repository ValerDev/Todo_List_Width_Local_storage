let todoData = JSON.parse(localStorage.getItem('allToDoes')) ? JSON.parse(localStorage.getItem('allToDoes')) : [];
const addToDoItem = (event) => {
    event.preventDefault()
    if(event.target.children[0].value){
        todoData.push({text: event.target.children[0].value, id: Date.now(), checked: false})
        localStorage.setItem('allToDoes',JSON.stringify(todoData))
        createTodoItem(JSON.parse(localStorage.getItem('allToDoes')))
        event.target.children[0].value = ''
    }
}

const createTodoItem = (items) => {
    document.querySelector('.todo-list').innerHTML = '';
    items.map((todo) => {
        let todoItem = document.createElement('div')
        todoItem.setAttribute('class', 'todo-item')
        todoItem.setAttribute("id", todo.id)
        let itemContent = `
            <span>${todo.text}</span>
            <div class='tools'>
                <input type='checkbox' ${todo.checked ? 'checked' : ''}  onchange=(checkTodoItem(event)) />
                <button class='remove-btn' onclick = "removeItem(event)">✖</button>
            </div>
        `
        todoItem.innerHTML = itemContent;
        document.querySelector('.todo-list').appendChild(todoItem)
    })
}

createTodoItem(todoData)

const removeItem = (event) => {
    todoData = []
    JSON.parse(localStorage.getItem("allToDoes")).map((todo)=>{
        console.log(todo)
        if(+event.target.parentNode.parentNode.id === +todo.id){
            document.querySelector(".todo-list").removeChild(event.target.parentNode.parentNode)
        }else{
            todoData.push({text: todo.text, id: todo.id, checked: todo.checked})
        }        
    })
    localStorage.setItem('allToDoes', JSON.stringify(todoData))
}

const checkTodoItem = (event) => {
    JSON.parse(localStorage.getItem("allToDoes")).map((todo, index)=>{
        if(+event.target.parentNode.parentNode.id === +todo.id){
            todoData[index].checked = event.target.checked
        }
    })
    localStorage.setItem('allToDoes', JSON.stringify(todoData))
}

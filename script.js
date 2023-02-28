const todoList = document.querySelector('.all-data')
const addBtn = document.querySelector('.add-todo')
const todoInp = document.querySelector('.todo-input')
const closeBtn = document.querySelector('.close-btn')

//GET запрос
const todoPage = ({id, title, completed}) => {
    todoList.insertAdjacentHTML('beforeend', `
        <div class="form-check" id="todo${id}">
            <label for="">
                <input onchange="toogleCompletedTodo(${id})" type="checkbox" ${completed && 'checked'}>
                ${title}
            </label>
            <button onclick="deleteTodo(${id})" class="close-btn">Close</button>
        </div>
    `)
}

const getAllTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    const data = await res.json()
    // console.log(data)
    
    data.forEach(todo => todoPage(todo))

}
getAllTodos()

// POST запрос
addBtn.addEventListener('click', async () => {
    const title = todoInp.value

    if (title) {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, completed: false})
        })

        const todo = await res.json()
        console.log(todo);
        todoPage(todo)
    }
})

const deleteTodo = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    if (data) {
        document.querySelector(`#todo${id}`).remove()
    }
}

// PUT запрос
const toogleCompletedTodo = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({completed})
    })

    const data = await res.json()

    console.log(data);
}



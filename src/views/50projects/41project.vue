<template>
    <div class="box">
        <h1 class="topSpace">todos</h1>
        <form id="form" class="topSpace">
            <input type="text" class="input" id="input" placeholder="Enter your todo" autocomplete="off">

            <ul class="todos" id="todos"></ul>
        </form>
        <small class="topSpace">Left click to toggle completed. <br> Right click to delete todo</small>
    </div>
</template>
<script>
export default {
    mounted() {
        const form = document.getElementById('form')
        const input = document.getElementById('input')
        const todosUL = document.getElementById('todos')

        const todos = JSON.parse(localStorage.getItem('todos'))

        if (todos) {
            todos.forEach(todo => addTodo(todo))
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            addTodo()
        })

        function addTodo(todo) {
            let todoText = input.value

            if (todo) {
                todoText = todo.text
            }

            if (todoText) {
                const todoEl = document.createElement('li')
                if (todo && todo.completed) {
                    todoEl.classList.add('completed')
                }

                todoEl.innerText = todoText

                todoEl.addEventListener('click', () => {
                    todoEl.classList.toggle('completed')
                    updateLS()
                })

                todoEl.addEventListener('contextmenu', (e) => {
                    e.preventDefault()

                    todoEl.remove()
                    updateLS()
                })

                todosUL.appendChild(todoEl)

                input.value = ''

                updateLS()
            }
        }

        function updateLS() {
           const todosEl = document.querySelectorAll('li')

            const todos = []

            todosEl.forEach(todoEl => {
                todos.push({
                    text: todoEl.innerText,
                    completed: todoEl.classList.contains('completed')
                })
            })

            localStorage.setItem('todos', JSON.stringify(todos))
        }
    }
}
</script>
<style lang="less">
* {
    box-sizing: border-box;
}

.box {
    background-color: #f5f5f5;
    color: #444;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    .topSpace{
        margin: 2rem 0rem;
    }
}

h1 {
    color: rgb(179, 131, 226);
    font-size: 10rem;
    text-align: center;
    opacity: 0.4;
}

form {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    width: 400px;
}

.input {
    border: none;
    color: #444;
    font-size: 2rem;
    padding: 1rem 2rem;
    display: block;
    width: 100%;
}

.input::placeholder {
    color: #d5d5d5;
}

.input:focus {
    outline-color: rgb(179, 131, 226);
}

.todos {
    background-color: #fff;
    padding: 0;
    margin: 0;
    list-style-type: none;
}

.todos li {
    border-top: 1px solid #e5e5e5;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 1rem 2rem;
}

.todos li.completed {
    color: #b6b6b6;
    text-decoration: line-through;
}

small {
    color: #b5b5b5;
    margin-top: 3rem;
    text-align: center;
}
</style>
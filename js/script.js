// todo-control
// header-input
// todo-list
// todo-completed

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = JSON.parse(localStorage.getItem('toDoData')) || [];


const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item')
        li.innerHTML = `
            <span class="text-todo">${item.text}</span>
            <div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
        `;
        
        li.querySelector(".todo-complete").addEventListener(
            "click",
            function () {
                item.completed = !item.completed;
                render();
                saveToLocalStorage()
            }
        );
        li.querySelector(".todo-remove").addEventListener("click", function () {
            toDoData.splice(toDoData.indexOf(item), 1);
            render();
            saveToLocalStorage()
        });

        if (item.completed) {
            todoCompleted.append(li);
        } else todoList.append(li);
    })    
}

function saveToLocalStorage() {
    localStorage.setItem("toDoData", JSON.stringify(toDoData));
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    if (headerInput.value.trim() === '') {
        alert('Введите название')
        return
    }

    const newToDo = {
        text: headerInput.value,
        completed: false
    }

    toDoData.push(newToDo);
    headerInput.value = '';
    render();
    saveToLocalStorage()
})

render();

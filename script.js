// Select DOM Elements
const input = document.getElementById("to-doinput");
const button = document.getElementById("btn");
const list = document.getElementById("to-dolist");

// Try to load saved to-dos from localStorage (if any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];
//check whether the saved string is valid JSON or not


function saveTodos() {
    // Save current to-dos array to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Create a dom node for a to-do object and append it to the list
function createTodoNode(todo, index) {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    //checkbox to toggle completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration =
            todo.completed ? "line-through" : "none";
        //Visual feedback : strike-through when completed

        saveTodos();
    })
    //Text of the Todos

    textSpan.style.margin = "0 8px";
    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    //add double-click event listener to edit todo
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim()
            textSpan.textContent = todo.text;
            saveTodos();
        };
    });

    //Delete Todo button
    const delbutton = document.createElement("button");
    delbutton.textContent = "Delete";
    delbutton.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbutton);
    return li


}

//Render the whole To-do list from to-do's array  
function render() {
    list.innerHTML = " ";

    //recreate each item
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node)
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }
    //Push a new Todo object
    todos.push({ text: text, completed: false });
    input.value = "";
    render();
    saveTodos();
}

button.addEventListener("click", addTodo);
buttom.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        addTodo();
    }
})
render();
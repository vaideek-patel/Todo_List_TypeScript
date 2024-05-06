document.addEventListener("DOMContentLoaded", ()=>{
    const list = document.querySelector("#list");
    const completedList = document.querySelector("#completed-list");
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#inputField");
    let tasks = loadTasks();
    const inputField = input;
    tasks.forEach(addListItem);
    form?.addEventListener("submit", (e)=>{
        e.preventDefault();
        if (!input?.value) return;
        const newTask = {
            id: generateID(),
            title: input.value,
            completed: false,
            createdAt: new Date()
        };
        tasks.push(newTask);
        saveTasks(tasks);
        addListItem(newTask);
        input.value = "";
    });
    function addListItem(task) {
        const item = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", ()=>{
            if (checkbox.checked) setTimeout(()=>{
                task.completed = checkbox.checked;
                item.remove();
                tasks = tasks.filter((t)=>t.id !== task.id);
                saveTasks(tasks);
                addCompletedTask(task);
            }, 500);
        });
        label.append(checkbox, task.title);
        const editIcon = document.createElement("i");
        editIcon.className = "fas fa-edit";
        editIcon.style.marginLeft = "50px";
        editIcon.addEventListener("click", ()=>{
            if (inputField) {
                inputField.value = task.title;
                tasks = tasks.filter((t)=>t.id !== task.id);
                saveTasks(tasks);
                item.remove();
            }
        });
        const space = document.createTextNode("\xa0\xa0");
        item.append(label, space, editIcon, space);
        list?.append(item);
    }
    function addCompletedTask(task) {
        const item = document.createElement("li");
        item.textContent = task.title;
        completedList?.append(item);
    }
});
function generateID() {
    return Math.random().toString(36).substr(2, 9);
}
function saveTasks(tasks) {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
    const taskJson = localStorage.getItem("TASKS");
    if (taskJson === null) return [];
    return JSON.parse(taskJson);
}

//# sourceMappingURL=index.377278e2.js.map

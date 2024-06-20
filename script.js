class Task {
    constructor(description, isDone = false) {
        this.description = description;
        this.isDone = isDone;
    }
}

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.tasksTodoContainer = document.getElementById('tasks-todo');
        this.tasksDoneContainer = document.getElementById('tasks-done');
        this.newTaskInput = document.getElementById('new-task-input');
        this.addTaskButton = document.getElementById('add-task-button');
        this.tasksTodoCount = document.getElementById('tasks-todo-count');
        this.tasksDoneCount = document.getElementById('tasks-done-count');
        
        this.addTaskButton.addEventListener('click', () => this.addTask());
        this.newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        
        this.renderTasks();
    }
    
    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks).map(task => new Task(task.description, task.isDone)) : [];
    }
    
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    
    addTask() {
        const description = this.newTaskInput.value.trim();
        if (description) {
            this.tasks.push(new Task(description));
            this.newTaskInput.value = '';
            this.saveTasks();
            this.renderTasks();
        }
    }
    
    toggleTask(index) {
        this.tasks[index].isDone = !this.tasks[index].isDone;
        this.saveTasks();
        this.renderTasks();
    }
    
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
    }
    
    renderTasks() {
        this.tasksTodoContainer.innerHTML = '';
        this.tasksDoneContainer.innerHTML = '';
        let tasksTodoCount = 0;
        let tasksDoneCount = 0;
        
        this.tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            if (task.isDone) {
                taskElement.classList.add('done');
                taskElement.innerHTML = `<span>${task.description}</span>`;
            } else {
                taskElement.innerHTML = `
                    <span>${task.description}</span>
                    <div>
                        <button onclick="taskManager.toggleTask(${index})">&#10003;</button>
                        <button onclick="taskManager.deleteTask(${index})">&#128465;</button>
                    </div>
                `;
            }
            
            if (task.isDone) {
                this.tasksDoneContainer.appendChild(taskElement);
                tasksDoneCount++;
            } else {
                this.tasksTodoContainer.appendChild(taskElement);
                tasksTodoCount++;
            }
        });
        
        this.tasksTodoCount.textContent = tasksTodoCount;
        this.tasksDoneCount.textContent = tasksDoneCount;
    }
}

const taskManager = new TaskManager();

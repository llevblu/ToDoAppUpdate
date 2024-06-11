document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const tasksToDoList = document.getElementById('tasks-to-do');
    const doneTasksList = document.getElementById('done-tasks');
    const tasksToDoCount = document.getElementById('tasks-to-do-count');
    const doneCount = document.getElementById('done-count');

    const loadTasks = () => {
        const tasksToDo = JSON.parse(localStorage.getItem('tasksToDo')) || [];
        const doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];

        tasksToDo.forEach(task => addTaskToList(task, false));
        doneTasks.forEach(task => addTaskToList(task, true));

        updateCounts();
    };

    const saveTasks = () => {
        const tasksToDo = Array.from(tasksToDoList.children).map(task => task.querySelector('.task-text').textContent);
        const doneTasks = Array.from(doneTasksList.children).map(task => task.querySelector('.task-text').textContent);

        localStorage.setItem('tasksToDo', JSON.stringify(tasksToDo));
        localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    };

    const updateCounts = () => {
        tasksToDoCount.textContent = tasksToDoList.children.length;
        doneCount.textContent = doneTasksList.children.length;
    };

    const addTaskToList = (task, isDone) => {
        const listItem = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task;

        const icons = document.createElement('div');
        icons.className = 'icons';

        const checkIcon = document.createElement('button');
        checkIcon.innerHTML = '&#10003;'; 
        checkIcon.addEventListener('click', () => {
            if (listItem.classList.contains('done')) {
                doneTasksList.removeChild(listItem);
                tasksToDoList.appendChild(listItem);
                listItem.classList.remove('done');
            } else {
                tasksToDoList.removeChild(listItem);
                doneTasksList.appendChild(listItem);
                listItem.classList.add('done');
            }
            saveTasks();
            updateCounts();
        });

        const deleteIcon = document.createElement('button');
        deleteIcon.innerHTML = '&#128465;';
        deleteIcon.addEventListener('click', () => {
            if (listItem.classList.contains('done')) {
                doneTasksList.removeChild(listItem);
            } else {
                tasksToDoList.removeChild(listItem);
            }
            saveTasks();
            updateCounts();
        });

        icons.appendChild(checkIcon);
        icons.appendChild(deleteIcon);
        listItem.appendChild(taskText);
        listItem.appendChild(icons);

        if (isDone) {
            listItem.classList.add('done');
            doneTasksList.appendChild(listItem);
        } else {
            tasksToDoList.appendChild(listItem);
        }

        saveTasks();
        updateCounts();
    };

    addTaskButton.addEventListener('click', () => {
        const task = newTaskInput.value.trim();
        if (task) {
            addTaskToList(task, false);
            newTaskInput.value = '';
        }
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    loadTasks();
});

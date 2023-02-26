var taskNumber = 0


/*Gets the new task name from the input bar and sends the data to thea append task*/
function getTaskName() {
    addTask = document.getElementById('taskButton');
    addTask.addEventListener('click', function() {
        taskName = document.getElementById('taskInput').value
        taskID = 'task' + taskNumber
        taskNumber = taskNumber + 1;
        appendTask(taskID, taskName);
        document.getElementById('taskInput').value = ''
    })
    addTaskEnter = document.getElementById('taskInput');
    addTaskEnter.addEventListener('keypress', function(e){
        if(e.key === 'Enter') {
            taskName = document.getElementById('taskInput').value
            taskID = 'task' + taskNumber
            taskNumber = taskNumber + 1;
            appendTask(taskID, taskName);
            document.getElementById('taskInput').value = ''
        }
    })
}
getTaskName()

/*takes task name from getTaskName, and puts it into a new set of div elements, appends to location for all tasks, adds animations as well */
function appendTask(taskID, taskName) {
    var addedTask = document.createElement('div');
    addedTask.setAttribute('class', 'taskContainer');
    addedTask.setAttribute('id', taskID);
    addedTask.innerHTML = `
        <div class="checkContainer" id="${taskID}">
            <input type="checkbox" class="checkbox newCheckAnimation" name="type" id="${taskID}">
        </div>
        <div class="task newTaskAnimation" id="${taskID}">${taskName}</div>
        <button class="edit newEditAnimation" id="${taskID}">Edit</button>
        <button class="delete newDeleteAnimation" id="${taskID}">Delete</button>
    `;
    document.getElementById('overviewContainer').appendChild(addedTask);
    checkEventListener();
    deleteEventListener();
    editEventListener();
    setTimeout(function(){
        document.querySelector(`#${taskID}.checkbox`).classList.remove('newCheckAnimation')
        document.querySelector(`#${taskID}.task`).classList.remove('newTaskAnimation')
        document.querySelector(`#${taskID}.edit`).classList.remove('newEditAnimation')
        document.querySelector(`#${taskID}.delete`).classList.remove('newDeleteAnimation')
    },400)
}

/*Adds event listener to all checks and check container, and then triggers function to update the style below for the specific task the user clicked on */
function checkEventListener() {
    var checkContainer = document.getElementsByClassName('checkContainer');
    for (var i = 0; i<checkContainer.length; i++) {
        if(checkContainer){
            checkContainer[i].addEventListener('click', updateStyleDone, false);
        }
    }
}

/*Adds event listener to all delete buttons, then triggers function to delete specific to the task the user clicked on */
function deleteEventListener() {
    var deleteContainer = document.getElementsByClassName('delete');
    for (var i = 0; i<deleteContainer.length; i++) {
        if(deleteContainer) {
            deleteContainer[i].addEventListener('click', deleteTask, false)
        }
    }
}

/*Adds event listener to all edit buttons, then triggers function to edit specific to the task the user clicked on */
function editEventListener() {
    var editContainer = document.getElementsByClassName('edit');
    for (var i = 0; i<editContainer.length; i++) {
        if(editContainer) {
            editContainer[i].addEventListener('click', editTask, false)
        }
    }
}

/*Adds classes to update the style of div elements in the task, adds additional classes in the 'else' portion to trigger animations */
function updateStyleDone() {
    taskID = this.id
    var updatedTask = document.querySelector(`#${this.id}.taskContainer`)
    if (updatedTask.querySelector(`#${this.id}.checkbox`).checked) {
        updatedTask.querySelector(`#${this.id}.task`).classList.remove
        updatedTask.querySelector(`#${this.id}.task`).classList.add('finished-task')
        updatedTask.querySelector(`#${this.id}.checkContainer`).classList.add('finished-checkContainer')
        updatedTask.querySelector(`#${this.id}.edit`).classList.add('finished-edit')
    } else {
        updatedTask.querySelector(`#${this.id}.task`).classList.remove('finished-task')
        updatedTask.querySelector(`#${this.id}.checkContainer`).classList.remove('finished-checkContainer')
        updatedTask.querySelector(`#${this.id}.edit`).classList.remove('finished-edit')
        updatedTask.querySelector(`#${this.id}.task`).classList.add('taskGreen')
        updatedTask.querySelector(`#${this.id}.checkContainer`).classList.add('checkGreen')
        updatedTask.querySelector(`#${this.id}.edit`).classList.add('editGreen')
        setTimeout(function() {
            updatedTask.querySelector(`#${taskID}.task`).classList.remove('taskGreen')
            updatedTask.querySelector(`#${taskID}.checkContainer`).classList.remove('checkGreen')
            updatedTask.querySelector(`#${taskID}.edit`).classList.remove('editGreen')
        },400 )
    }
    
}

/* On click, triggers a popup, which then if the user confirms to delete, the function removes that specific task from the DOM */
function deleteTask() {
    document.getElementById('popup-1').classList.toggle('active');
    divID = this.id;
    var confirmDelete = document.getElementById('popDelete')
    function deleteTaskContainer() {
        document.querySelector(`#${divID}.taskContainer`).remove();
        document.getElementById('popup-1').classList.toggle('active');
        confirmDelete.removeEventListener('click', deleteTaskContainer);
    }
    confirmDelete.addEventListener('click', deleteTaskContainer);
    var cancelDelete = document.getElementById('popCancel')
    cancelDelete.addEventListener('click', function(){
        document.getElementById('popup-1').classList.remove('active')
});
};

/* On click opens popup which asks the user for a new name of the task, upon clicking confirm, passes the new name into the textcontent */
function editTask() {
    document.getElementById('popup-2').classList.toggle('active');
    id = this.id
    var confirm = document.getElementById('popConfirm');
    confirm.addEventListener('click', function() {
        var newTaskName = document.getElementById('editInput').value;
        document.querySelector(`#${id}.task`).textContent = newTaskName
        document.getElementById('popup-2').classList.remove('active')
        document.getElementById('editInput').value = "";
    })
    confirmEnter = document.getElementById('editInput');
    confirmEnter.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            var newTaskName = document.getElementById('editInput').value;
            document.querySelector(`#${id}.task`).textContent = newTaskName
            document.getElementById('popup-2').classList.remove('active')
            document.getElementById('editInput').value = "";
        }
    })
    var cancelEdit = document.getElementById('popCancel2')
    cancelEdit.addEventListener('click', function() {
        document.getElementById('popup-2').classList.remove('active')
    })
}
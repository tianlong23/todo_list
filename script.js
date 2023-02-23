/*
1) Create HTML and CSS outline of what it should look like - Done
2) Add item - DONE
    Create function that takes an input in the search bar and stores it in a variable
        once a user hits enter or clicks 'add item' the function reads the text.content value of the search bar
        create a unique ID based on a counter starting at 0, this id will be assigned to the id value and matched up with the rest of the element
        take this text.content and assign it to a temporary variable for the new task
        the search bar is then cleared back to its' original value
    Take variable and create a new main element in an item (i.e. the part with the task) (may need a sub-function for this)
        create a new container element for the new item, this should have the HTML for an entire item
            includes the checkbox to the left, the element itself, a delete button, and an edit button
            for the main element, there should be a variable that inputs the text.content of the searchbar
            for the checkbox, delete button, and edit button, there needs to be identifiers to match it with the specific item
    append this whole new element in to the existing list of items

3)Create checkbox functionality (when checkbox is clicked, the item should go from gray, to green, and have a strikethrough the text, when checked again goes away) - DONE
    search the existing element for an object matching both the class and the ID (example here is first an href for a class, then the ID("a.save#country")), should be query selector
    remove the existing class
    add a new class that changes the style to 'finished', as noted in the first line of this part
    remove existing class for the checkbox, delete, and edit buttons as well, add new class for the green style, but with no strikethrough

4) create the delete button and function - Done
    upon click:
        search the existing element for a container object matching the ID 
            have a popup appear double confirming they would like to delete task, "INSERT TASK NAME", this should be a nested function, if returns TRUE, then delete
                popup should be a second function that takes in the ID  from the delete task function
                the delete button should toggle the active class which makes the popup appear
                upon clicking, "YES", the function returns true 
            this "TRUE" is taken and deletes the element with element.remove()


5) Create the edit function - DONE
    upon click:
        search the existing element for an object matching both the class and the ID (example here is first an href for a class, then the ID("a.save#country")), should be query selector
        create a popup that has an input bar, with buttons that say, confirm, and cancel
            create a click function so that if the user clicks on 'confirm', the function returns TRUE, if they click cancel, then FALSE
                if TRUE, take the text.content from the input bar, and set to a temporary value
                for the element that was found after the search, update the text.content with the temporary values text.content
                if FALSE, end the function
                re-apply the styling to remove the popup

6) OPTIONAL make function to animate completed tasks to the bottom and shift the other ones up
*/

var taskNumber = 0

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
            console.log('ere')
            taskName = document.getElementById('taskInput').value
            taskID = 'task' + taskNumber
            taskNumber = taskNumber + 1;
            appendTask(taskID, taskName);
            document.getElementById('taskInput').value = ''
        }
    })
}
getTaskName()


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

function checkEventListener() {
    var checkContainer = document.getElementsByClassName('checkContainer');
    for (var i = 0; i<checkContainer.length; i++) {
        if(checkContainer){
            checkContainer[i].addEventListener('click', updateStyleDone, false);
    }
}
    }

function deleteEventListener() {
    var deleteContainer = document.getElementsByClassName('delete');
    for (var i = 0; i<deleteContainer.length; i++) {
        if(deleteContainer) {
            deleteContainer[i].addEventListener('click', deleteTask, false)
        }
    }
}

function editEventListener() {
    var editContainer = document.getElementsByClassName('edit');
    for (var i = 0; i<editContainer.length; i++) {
        if(editContainer) {
            editContainer[i].addEventListener('click', editTask, false)
        }
    }
}


function updateStyleDone() {
    taskID = this.id
    var updatedTask = document.querySelector(`#${this.id}.taskContainer`)
    if (updatedTask.querySelector(`#${this.id}.checkbox`).checked) {
        updatedTask.querySelector(`#${this.id}.task`).classList.remove
        updatedTask.querySelector(`#${this.id}.task`).classList.add('finished-task')
        updatedTask.querySelector(`#${this.id}.checkContainer`).classList.add('finished-checkContainer')
        updatedTask.querySelector(`#${this.id}.edit`).classList.add('finished-edit')
        //reorderFinishedTasks(updatedTask);
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
        //reorderUnFinishedTasks(updatedTask);
    }
    
}

//may need to create a new class in CSS, and add and remove it with a new animation

//update unclicked checkbox animation to not flash
//remove unecessary code
//refactor as much as possible
//put on git hub as "done"

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


/*function reorderFinishedTasks(updatedTask) {
    const container = document.getElementById('overviewContainer');
    const divTasks = Array.from(container.children);
    divTasks.sort(function(a,b) {
    if (a === updatedTask) {
        return 1;
    } else if (b === updatedTask) {
        return - 1;
    } else {
        return 0;
    }
    });
    console.log(divTasks);
    divTasks.forEach(div => container.appendChild(div))
} */

function reorderUnFinishedTasks(updatedTask) {
    const container = document.getElementById('overviewContainer');
    const divTasks = Array.from(container.children);
    divTasks.sort(function(a,b) {
    if (a === updatedTask) {
        return -1;
    } else if (b === updatedTask) {
        return 1;
    } else {
        return 0;
    }
    });
    console.log(divTasks);
    divTasks.forEach(div => container.appendChild(div))
}
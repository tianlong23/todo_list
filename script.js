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

4) create the delete button and function
    upon click:
        search the existing element for a container object matching the ID 
            have a popup appear double confirming they would like to delete task, "INSERT TASK NAME", this should be a nested function, if returns TRUE, then delete
                popup should be a second function that takes in the ID  from the delete task function
                the delete button should toggle the active class which makes the popup appear
                upon clicking, "YES", the function returns true 
            this "TRUE" is taken and deletes the element with element.remove()


5) Create the edit function
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
        taskName = $('.taskInput').text();
        console.log(taskName);
        taskID = 'task' + taskNumber
        taskNumber = taskNumber + 1;
        appendTask(taskID, taskName);
        $('.taskInput').text('What do you want to get done today?')
    })
}
getTaskName()

function appendTask(taskID, taskName) {
    var addedTask = document.createElement('div');
    addedTask.setAttribute('class', 'taskContainer');
    addedTask.setAttribute('id', taskID);
    addedTask.innerHTML = `
        <div class="checkContainer" id="${taskID}">
            <input type="checkbox" class="checkbox" name="type" id="${taskID}">
        </div>
        <div class="task" id="${taskID}">${taskName}</div>
        <button class="edit" id="${taskID}">Edit</button>
        <button class="delete" id="${taskID}">Delete</button>
    `;
    console.log(addedTask);
    document.getElementById('overviewContainer').appendChild(addedTask);
    finishTask();
    checkEventListener();
    deleteTask();
}
function finishTask() {
    $("input:checkbox[name=type]:checked").each(function() {
        console.log(this.id)
    })
}

function checkEventListener() {
    var checkContainer = document.getElementsByClassName('checkContainer');
    for (var i = 0; i<checkContainer.length; i++) {
        if(checkContainer){
            checkContainer[i].addEventListener('click', updateStyleDone, false);
    }
}
    
    }

function updateStyleDone() {
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
    }
}

function deleteTask() {
    var deleteButton = document.getElementsByClassName('delete');
    for (var i = 0; i<deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', function(){
            document.getElementById('popup-1').classList.toggle('active');
            console.log(this.id)
            divID = this.id;
        })
    }
    var cancelDelete = document.getElementById('popCancel')
    cancelDelete.addEventListener('click', function(){
        document.getElementById('popup-1').classList.remove('active')
    })
    var confirmDelete = document.getElementById('popDelete')
    console.log('confirm delete: ' + confirmDelete);
    confirmDelete.addEventListener('click', function(){
        console.log(document.querySelector(`#${divID}.taskContainer`));
        //HERE, need to figure out why this chunk of code is running twice
    })
}

deleteTask ()
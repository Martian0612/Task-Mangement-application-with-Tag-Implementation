function displayTasks(user, current_task_ls, message = "") {
    console.log("user_task_ls inside displayTasks func. ", current_task_ls);
    console.log("I am inside displayTasks function. ");
    const taskDisplay = document.querySelector("#task-display");
    taskDisplay.innerHTML = '<div class="task-container"></div>';
    const cardContainer = taskDisplay.querySelector('.task-container');
    // Not updating it inside function.
    // const user_task_ls = user["taskList"];
    // USING "LET" OVER "CONST" BECAUSE DEFINING THIS VARIABLE AT MULTIPLE PLACES.
    let user_task_ls = current_task_ls;


    const predefinedTags = [
        { value: uuidv4(), text: "Work" },
        { value: uuidv4(), text: "Personal" },
        { value: uuidv4(), text: "Urgent" }
    ];

    const tagModal = document.getElementById('tag-modal');
    // const openTagModal = document.querySelector('.tag-button');
    const closeTagModal = document.getElementById('close-tag-modal');

    closeTagModal.addEventListener("click", () => {
        tagModal.style.display = "none";
    });

    console.log("got the message: ", message);

    if (message) {
        cardContainer.innerHTML = `<div class="no-tasks-container"><p class="no-tasks-message">${message}</p></div>`;
    }

    else {
        for (const task of user_task_ls) {
            const taskCard = document.createElement("div");
            taskCard.className = "task-card";

            // Convert the task's due date to a formatted string
            const dueDate = new Date(task.dueDate);
            const formattedDate = dueDate.toLocaleDateString() + ' ' + dueDate.toLocaleTimeString();

            taskCard.innerHTML = `
                <div class="task-selection">
                    <div class="task-checkbox-wrapper">
                        <input type="checkbox" class="task-checkbox" data-task-id="${task.task_id}">
                        <div class="checkbox-custom"></div>
                    </div>
                    <i class="material-icons delete-icon" data-task-id="${task.task_id}">delete</i>
                </div>
    
                <div class="card-header">
                    <h3 class="task-title">${task.task}</h3>
                    <div class="status-priority">
                        <div class="status-badge" data-status="${task.status.toLowerCase()}">${getStatusEmoji(task.status)}</div>
                        <div class="priority-flag" data-priority="${task.priority.toLowerCase()}">
                            <span>${getPriorityEmoji(task.priority)}</span>
                            <span>${capitalize(task.priority)}</span>
                        </div>
                    </div>
                </div>
    
                <div class="tags-container"> </div>
         
    
                <div class="card-footer">
                    <button class="tag-button" ">
                        <span class="tag-icon">+</span>
                        <span>Add Tag</span>
                    </button>
                    <button class="reminder-btn" title="${formattedDate}" date-has-reminder="true">
                        <span>🔔</span>
                    </button>
                </div> `;

            // *************************************

            taskCard.querySelector('.tag-button').dataset.taskid = task.task_id;
            // Add click handler for editing(i.e. allow to edit only if it is not click at any button like add tag, notify or tags chip itself.)
            taskCard.addEventListener("click", (e) => {

                // If clciked on checkbox or delete icon, don't open modal.
                if (e.target.closest('.task-checkbox') || e.target.closest('.delete-icon')) {
                    return;
                }

                // If clicked on tag button or reminder button, don't open modal.
                // if (e.target.closest('.tag-button') ||e.target.closest('.reminder-btn')){
                //     return;
                // }

                // **************************** Check this part *************************
                // This condition is sort of redundant, but let's add it for now.
                if (!e.target.closest('.tag-button') && !e.target.closest('.reminder-btn')) {
                    document.getElementById("modal-title").textContent = "Update Task";
                    isEditMode = true; // Using the global variable
                    editTaskId = task.task_id; // Using the global variable
                    populateModalForm(task);
                    modal.style.display = "block";
                    // Added later on, after working with delete functionality.
                }

                // else if (e.target.closest('.tag-button')) {
                else if (e.target.closest('.tag-button')) {
                    const button = e.target.closest('.tag-button');

                    // Setting the task_id to tagModal from tagButton.
                    const taskId = button.dataset.taskid;
                    console.log("taskId at button is ", taskId);
                    tagModal.dataset.taskid = taskId; // Set taskId on the modal
                    tagModal.style.display = 'block';
                    tagHandler(user, predefinedTags, tagModal);
                    console.log(tagModal.dataset.taskid);
                }
            });

            cardContainer.appendChild(taskCard);

        }
    }
}

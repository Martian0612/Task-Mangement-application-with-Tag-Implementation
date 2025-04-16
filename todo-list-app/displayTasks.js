function displayTasks(user, current_task_ls, message = "") {
    console.log("user_task_ls inside displayTasks func. ", current_task_ls);
    console.log("I am inside displayTasks function. ");
    const taskDisplay = document.querySelector("#task-display");
    taskDisplay.innerHTML = '<div class="task-container"></div>';
    const cardContainer = taskDisplay.querySelector('.task-container');
    let user_task_ls = current_task_ls;
    console.log("got the message: ", message);
    if (message) {
        cardContainer.innerHTML = `<div class="no-tasks-container"><p class="no-tasks-message">${message}</p></div>`;
    }
    else {
        for (const task of user_task_ls) {
            const taskCard = document.createElement("div");
            taskCard.className = "task-card";
            const dueDate = new Date(task.dueDate);
            const formattedDate = dueDate.toLocaleDateString() + ' ' + dueDate.toLocaleTimeString();
            const isActive = dueDate > new Date();
            // Default bell state when there is no date and time are set.
            const bellIconHTML = `
            <button class="reminder-button" id="reminder-btn-${task.task_id} data-task-id="${task.task_id}" ${isActive ? 'data-reminder="active"' : ''}> 
            <span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                   </svg></span>
            <div class="reminder-tooltip">${formattedDate}</div>
            </button>
            `;
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
                    <button class="tag-button" id="tag-btn-${task.task_id}" data-task-id="${task.task_id}">
                        <span>Add Tag</span>
                    </button>
                     ${bellIconHTML}
                </div> `;
            taskCard.dataset.taskId = task.task_id;
            cardContainer.appendChild(taskCard);
            updateTaskCardTags(task, userListKey, userMap);
        }
    }
    function handleTaskDisplayClick(event) {
        if (!event.target.closest('.task-card')) return;
        if (event.target.matches('.tag-button') || event.target.closest('.tag-button')) {
            console.log("user is ", userList.find(user => user.username === "marshian2511"));
            const predefinedTags = [
                { value: uuidv4(), text: "Work" },
                { value: uuidv4(), text: "Personal" },
                { value: uuidv4(), text: "Urgent" }
            ];
            event.stopPropagation();
            const taskCard = event.target.closest('.task-card');
            const taskId = taskCard.dataset.taskId;
            console.log("Tag button clicked for task: ", taskId);
            const tagModal = document.getElementById('tag-modal');
            tagModal.dataset.taskid = taskId;
            tagModal.style.display = 'block';
            tagHandler(userListKey, userMap, currentUser, predefinedTags, tagModal);
            return;
        }
       if (event.target.matches('.reminder-button') || event.target.closest('.reminder-button')) {
            event.stopPropagation();
            const reminderButton = event.target.closest('.reminder-button');
            const taskId = event.target.closest('.task-card').dataset.taskId;
            console.log("Reminder button clicked for task: ", taskId);

            // Toggle the UI state for the reminder button
            reminderButton.classList.toggle('setting-reminder');

            // Update the bell icon based on state
            const bellIcon = reminderButton.querySelector('.bell-icon');
            if (reminderButton.classList.contains('setting-reminder')) {
                // Change to bell with sound waves
                bellIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 8c0-2.2.7-4.3 2-6" stroke="currentColor" stroke-width="2"></path>
                    <path d="M22 8a10 10 0 0 0-2-6" stroke="currentColor" stroke-width="2"></path>
                </svg>
            `;

                // Hide tooltip when reminder/notification is set.
                const tooltip = reminderButton.querySelector('.reminder-tooltip');
                if (tooltip) tooltip.style.display = 'none';
            }

            else {
                // Revert to original or default bell when either no date and time is set, or date and time is set.
                // const isActive = reminderButton.hasAttribute('data-reminder') && 
                //                  reminderButton.getAttribute('data-reminder') ==="active";

                // bellIcon.innerHTML = `
                //     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isActive ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                //         <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                //         <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                //     </svg>`;

                bellIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
            `;

                // Show tooltip again
                const tooltip = reminderButton.querySelector('.reminder-tooltip');
                if (tooltip) tooltip.style.display = '';
            }

            return;
        }
        if (event.target.closest('.task-card') &&
            !event.target.matches('task-checkbox') &&
            !event.target.closest('.task-checkbox') &&
            !event.target.matches('.delete-icon') &&
            !event.target.closest('.delete-icon')) {
            const taskCard = event.target.closest('.task-card');
            console.log("taskCard is ", taskCard);
            const taskId = taskCard.dataset.taskId;
            console.log("Task card clicked, opening edit modal", taskId);
            document.getElementById("modal-title").textContent = "Update Task";
            isEditMode = true;
            editTaskId = taskId;
            const task = current_task_ls.find(t => t.task_id === taskId);
            console.log("task is ", task);
            populateModalForm(task);
            modal.style.display = "block";
        }
    }
    taskDisplay.removeEventListener("click", handleTaskDisplayClick);
    taskDisplay.addEventListener("click", handleTaskDisplayClick);
}

// import { showGlobalOverlay, hideGlobalOverlay } from "./app";
import {User} from 'data.js';
// import {handler}
export class SelectionManager {

    constructor() {
        this.selectedTasks = new Set();
        this.selectionBar = document.querySelector('.selection-bar');
        // Maybe here we are just calling the setupSelectionHandlers() method of our class, when creating any object of this.
        this.setupSelectionHandlers();
        this.isSelectionMode = false; // This is for showing all checkboxes, when one checkbox is clicking on hovering the task card.
    }

    setupSelectionHandlers() {

        // Right now checkbox is showing only when we hovering on the task, but normally it need to add checkbox to everytask. In order to add checkbox to every task, we need to iterate the task-list and need to show the checkbox to every task.
        
        const select_all_btn = document.querySelector('.select-all-btn');
        select_all_btn.addEventListener("click", () => this.handleSelectAll());
        
        const cancel_selection_btn = document.querySelector('.cancel-selection-btn');
        cancel_selection_btn.addEventListener("click", () => this.handleCancelSelection());

        // It's for bulk delete option, using a single button.
        const delete_selected_btn = document.querySelector('.delete-selected-btn');
        delete_selected_btn.addEventListener("click", () => {
            // Need to implement delete functionality, will do it later on.
            // We are going to open the modal
            // showGlobalOverlay();
            const deleteModal = document.getElementById("delete-modal");
            deleteModal.style.display = "block";
            // hideGlobalOverlay();
            console.log('Delete functionality will be implemented later.')
        });

        // const modal_cancel_btn = document.querySelector('modal-cancel-btn');
        // modal_cancel_btn.addEventListener("click",()=>{
        //     deleteModal.style.display = "none";
        // });
    }

    // New methods

    showAllCheckboxes() {
        const taskCards = document.querySelectorAll('.task-card');
        // Showing checkboxes for all tasks.
        taskCards.forEach(card => {
            const selectionArea = card.querySelector('.task-selection');
            selectionArea.style.display = 'flex';
        });
        this.selectionMode = true;
    }

    hideAllCheckboxes() {
        if (this.selectedTasks.size === 0){
            const taskCards = document.querySelectorAll('.task-card');
            taskCards.forEach(card => {
                const selectionArea = card.querySelector('.task-selection');
                selectionArea.style.display = 'none';
            });
            this.selectionMode = false;
        }
    }


    handleCheckboxChange(event) {
        event.stopPropagation(); // Stop event from bubbling up to task card.
        const taskId = event.target.getAttribute('data-task-id');

        if (event.target.checked) {
            this.selectedTasks.add(taskId);
            this.showAllCheckboxes();
        }
        else {
            this.selectedTasks.delete(taskId);
            if (this.selectedTasks.size === 0){
                this.hideAllCheckboxes();
            }
        }
        // Basically the count of selected tasks.
        this.updateSelectionBar();
    }

    // Handling bulk select.
    handleSelectAll() {
        // This checkbox container is associated with each task card, therefore we can just select all check box by selecting the checkboxes, rather than first going to all the task cards, adding checkbox and marking them(checked them.).
        const checkboxes = document.querySelectorAll('.task-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
            // Adding all the task
            this.selectedTasks.add(checkbox.getAttribute('data-task-id'));
        });
        this.updateSelectionBar();

    }

    // Cancelling bulk selection.
    handleCancelSelection() {
        // Here we are not manually hiding the selection bar, we are just deselecting all the tasks, by removing all the task-ids from our selectedTasks set(which is for deleted tasks having task-ids present in set.) and here we are calling updateSelectionBar which will handle this hiding feature by itself.
        this.selectedTasks.clear();
        const checkboxes = document.querySelectorAll('.task-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        // this.hideAllCheckboxes();
        this.updateSelectionBar();
    }

    // Showing and hiding the selection bar.
    updateSelectionBar(){

        if (this.selectedTasks.size > 0 ){
            this.selectionBar.style.display = 'flex';
            this.selectionBar.querySelector('.selected-count').textContent = 
            `${this.selectedTasks.size} selected`;
        }
        else {
            this.selectionBar.style.display = 'none';
        }
    }

    // Basically handling the change, whether checkbox is marked or not.
    setupTaskCheckboxes() {
        const checkboxes = document.querySelectorAll('.task-checkbox');
        checkboxes.forEach(checkbox => {
            // Remove existing listeneres to prevent duplicates
            checkbox.removeEventListener('change',(e) => this.handleCheckboxChange(e));

            // Add new listener
            checkbox.addEventListener('change',(e) => this.handleCheckboxChange(e));
        });
    }

    handleDelete(user){
        
        // Checking if any tasks are selected.
        // If any of the checkboxes are selected.
        if (this.selectedTasks.length !=0) {
            user.deleteTask(this.selectedTasks);
        }
        // Showing confirmation modal for bulk delete is handled above in setupSelectionHandler, and we are handling showing modal for individual delete(basically via delete button icon.)
        
        const delete_btn_icon = document.querySelector('.material-icons delete-icon');
        delete_btn_icon.addEventListener('click',() => {
            const delete_modal = document.getElementById('delete-modal');
            delete_modal.style.display = 'block';
        })
    }

    clearSelectionState(){
        // 1. Clear selectedTasks Set
        // 2. Uncheck all checkboxes
        // 3. Hide selection bar
        // 4. Reset selection mode
    }
}

// function addCheckboxListeners() {
//     const checkboxes = document.querySelectorAll('.task-checkbox');
//     checkboxes.forEach(checkbox => {

//         // Remove any existing listeners first
//         checkbox.removeEventListener('change',handleCheckBoxChange);

//         // Add new listener
//         checkbox.addEventListener('change',handleCheckBoxChange);

//     });  

//     // Right now checkbox is showing only when we hovering on the task, but normally it need to add checkbox to everytask. In order to add checkbox to every task, we need to iterate the task-list and need to show the checkbox to every task.
//     const select_all_btn = document.querySelector('.select-all-btn');
//     select_all_btn.addEventListener("click",() => {
//         // Need to add checkboxes to all the tasks simultaneously and need to mark them check 
//     });

//     const cancel_selection_btn = document.querySelector('.cancel-selection-btn');
//     cancel_selection_btn.addEventListener("click", () => {
//         selectionBar.style.display = 'none';
//         // Uncheck all the checkboxes.
        
//     });

//     // It's for bulk delete option, using a single button.
//     const delete_selected_btn = document.querySelector('.delete-selected-btn');
//     delete_selected_btn.addEventListener("click",()=>{
//         // Need to implement delete functionality, will do it later on.
//     });
// }

// // *** How we are getting the event here?

// function handleCheckBoxChange(event) {
//     const taskId = event.target.getAttribute('data-task-id');
//     if (event.target.checked) {
//         selectedTasks.add(taskId);
//     }
//     else {
//         selectedTasks.delete(taskId);
//     }

//     // Update selection bar visibility and counter
//     if (selectedTasks.size > 0) {
//         selectionBar.style.display = 'flex';
//         selectionBar.querySelector('.selected-count').textContent =
//         `${selectedTasks.size} selected`;
//     }
//     else {
//         selectionBar.style.display = 'none';
//     }
// }

// // // export function sum(a,b){
// // //     return a+b;
// // // }

// // // document.getElementById("demo").innerHTML = sum(5,6);
// // import { handleFormSubmit } from "./ui.js";
// // import {User } from "./data.js";

// // const userList = [];
// // document.getElementById("submitBtn").addEventListener("click",()=>{
// //     // const userList = []; // It needed to create outside of the function, otherwise it will get created again and again.
// //     const {name, email} = handleFormSubmit();

// //     let newUser = None;
// //     if (userList.length){
// //         userList.forEach((user_obj) => {

// //             if(user_obj["email"] != email){
// //                 // Create user only if it doesn't exist.
// //                 newUser = new User(name, email);
// //                 // userList.push(newUser);
// //                 const list = JSON.parse(localStorage.getItem("userList"));
// //                 list.push(newUser);
// //             }
// //         });
// //     }
// //     else{
// //         // For the case when there is zero users exist.
// //         newUser = new User(name, email);

// //         // Instead of adding it in the array, we should add it in the browser array.
// //         // converting the string into an array
// //         const list = JSON.parse(localStorage.getItem("userList") );
// //         list.push(newUser);

// //         // userList.push(newUser);
// //     }


// //     // I need to find the right place for userList variable, so that things won't repeated or get cluttered.

// //     // This is for the case when userList array is not added to the local storage.

// //     if(! localStorage.getItem("userList")){
// //         console.log("I am inside if statment for adding users.")
// //         localStorage.setItem("userList",JSON.stringify(userList));
// //     }

// //     // just for checking
// //     console.log(newUser);
// // });

// // // displaying the user from the local storage (userList) and adding the constraint of not adding the user if it is already exist, basically will check the email of the existing object, if exist then we will say no, you can't take it.
// // // and we will also have to prevent userList in local storage if already exist.

// // // This is for showing dropdown only if any user exist in userList.
// // // It basically return null if no user exist, which is equal to 0(maybe), so no need to check the length of the array, in order to verify whether user exists or not.
// // if (! JSON.parse(localStorage.getItem("userList"))){
// //     dropdown_options = document.getElementById("choose-user");
// //     dropdown_options.addEventListener("change", ()=> {
// //         const select_options = JSON.parse(localStorage.getItem("userList"));

// //     });
// // }
// // else{
// //     document.getElementById("user-dropdown").style.display = "none";
// // }


// // ##############################


// // import { handleFormSubmit, handleTaskData } from "./ui.js";    
// // import {User} from "./data.js";

// // const userList = JSON.parse(localStorage.getItem("userList")) || [];

// // document.getElementById("submitBtn").addEventListener("click" , (event)=>{
// //     // Prevent automatic submission on loading.
// //     event.preventDefault();
// //     const {name, email} = handleFormSubmit();

// //     if( !name || !email){
// //         alert("Please fill out all required fields.");
// //         return;
// //     }
// //     const existingUser = userList.find(user => user.email === email);

// //     if(!existingUser){

// //         // Create the user
// //         const newUser = new User(name, email);
// //         userList.push(newUser);
// //         localStorage.setItem("userList", JSON.stringify(userList));
// //         alert("New user added: ", newUser);
// //         // Clearing the form fields.
// //         document.getElementById("user-data").reset();
// //     }

// //     else{
// //         alert("User with this email already exists: ", email);
// //     }
// // })

// // // Allowing the user choose option to display, only if any user exist, otherwise hide this option.
// // let currentUser = null;
// // // Hide the choose option
// // if(!userList.length){
// //     document.getElementById("user-dropdown").style.display = "none";
// // }
// // // Display the user choose option
// // else{
// //     const dropdown = document.getElementById("choose-user");
// //     userList.forEach((user, index ) => {

// //         // Its for displaying the options 
// //         const optionElement = document.createElement('option');
// //         optionElement.value = index
// //         optionElement.textContent = user["username"];

// //         dropdown.appendChild(optionElement);

// //     } );
// //         //  A trigger for allowing the chosen user to create tasks.
// //         dropdown.addEventListener("change",() => {
// //             // currentUser = user;
// //             // console.log("userr is ", user);
// //             // console.log("currentUser is ", currentUser + "is instance of User: ", currentUser instanceof User);
// //             // Hiding the user creation form.
// //             // document.getElementById("user-data").style.display = "none";
// //             // Hiding the user-selection dropdown container
// //             // document.getElementById("user-dropdown").style.display = "none";

// //             // Hiding the home page itself and showing user profile
// //             // document.getElementById("home-page").style.display = "none";
// //             // // showing the profile page
// //             // document.getElementById("user-profile").style.display = "block";

// //             // const element = document.getElementById("user-profile");
// //             // const para = element.querySelector("p");
// //             // const user_obj = document.createElement("h1");
// //             // user_obj.textContent = `Hi ${user["username"]}!`;
// //             // para.appendChild(user_obj);

// //             const selectedIndex = dropdown.value;
// //             currentUser = userList[selectedIndex];

// //             document.getElementById("home-page").style.display = "none";
// //             document.getElementById("user-profile").style.display = "block";

// //             const element = document.getElementById("user-profile");
// //             const para = element.querySelector("p");

// //             para.innerHTML = '';
// //             const user_obj = document.createElement("h1");
// //             user_obj.textContent = `Hi ${currentUser["username"]}!`;
// //             para.append(user_obj);
// //         }
// //     );

// // }

// // // Handling task addition


// // document.getElementById("add-task").addEventListener("click", (event) => {
// //     event.preventDefault();
// //     const {task} = handleTaskData();

// //     if (!task){
// //         alert("Please add a task.");
// //         return;
// //     }


// //     // const existingTask = task_list.find(existing_task => existing_task === task ); // Wrong code
// //     // Here currentUser.taskList basically access the taskList array, and then existingTask represents task objects, so from existingTask, we are trying to get the task by using existingTask.task.
// //     currentUser = User.fromJSON(currentUser); // Rehydration
// //     const existingTask = currentUser.taskList.find(existingTask => existingTask.task === task);
// //     console.log("existingTask: " + existingTask);

// //     if(!existingTask){
// //         // const current_user = User.fromJSON(currentUser);
// //         console.log("currentUser is ", currentUser + "is instance of User: ", currentUser instanceof User);
// //         console.log("task is ", task);
// //         currentUser.addTasks(task);
// //         alert("Task created successfully.");

// //     }
// //     else{
// //         alert("Task already exist.Try adding another task!");
// //     }

// // });

// // // For displaying the tasks
// // document.getElementById("view-task").addEventListener("click",()=>{

// // });

// // document.getElementById("back-to-home").addEventListener("click",()=>{
// //     document.getElementById("home-page").style.display = "block";
// //     document.getElementById("user-profile").style.display = "none";
// // });


// // ################################################################
// import { handleFormSubmit,handleTaskData } from "./ui.js";
// import {User} from "./data.js";
// // import {User, StorageProxy } from "./data.js";
// import { PageManager } from "./navigation.js";

// const userListKey = 'userList';
// const userMap = new Map();

// // Load from local storage and populate the userMap
// const storedUsers = JSON.parse(localStorage.getItem(userListKey)) || [];
// storedUsers.forEach(userData => {
//     const user = User.fromData(userData);
//     userMap.set(user.email, user);
// });
// let userList = Array.from(userMap.values()); // Create userList from userMap

// let currentUser = null;
// const pageManager = new PageManager();

// // Updating user dropdown
// function updateUserDropdown(){
//     const dropdown = document.getElementById("choose-user");
//     const userDropdownContainer = document.getElementById("user-dropdown");

//     // If no user exist, then don't show the dropdwon.
//     if(!userList.length){
//         userDropdownContainer.style.display = "none";
//         return;
//     }

//     dropdown.innerHTML = '<option value="" disabled selected> Choose an option</option>';
//     userDropdownContainer.style.display = "block";
//     userList.forEach((user, index) => {
//         const optionElement = document.createElement('option');
//         optionElement.value = index;
//         optionElement.textContent = user.username;
//         dropdown.appendChild(optionElement);
//     }
// );

// }

// // Choosing user from user selection dropdown.
// function handleUserSelection(event){
//     const selectedIndex = event.target.value;
//     console.log("selectedIndex is", selectedIndex);
//     currentUser = userList[selectedIndex];

//     updateProfileView(currentUser);
//     const task_dropdown = document.getElementById("view-task");
//     pageManager.showPage('profile');
//     displayTasks(currentUser);
// }

// // Basically updating the profile data after showing the profile page.
// function updateProfileView(user){
//     const para = document.querySelector("#user-profile p");
//     para.innerHTML = '';
//     const user_obj = document.createElement("h1");
//     user_obj.textContent = `Hi ${user.username}!`;
//     para.appendChild(user_obj);
// }

// function displayTasks(user){
//     const ele = document.querySelector("#task-display ol");
//     const user_task_ls = user["taskList"];
//     ele.innerHTML = '';
//     for(const task of user_task_ls){
//         const li = document.createElement("li");
//         for(const prop in task){
//             if(prop == "task"){
//                 li.textContent = task[prop];
//                 break;
//             }
//         }
//         ele.appendChild(li);
//     }
// }

// function handleBackToHome(){
//     pageManager.showPage('home');
//     currentUser = null;
//     updateUserDropdown();

// }



// function setupEventListeners(){
//     document.getElementById("submitBtn").addEventListener("click", (event) => {
//         event.preventDefault();
//         const {name, email } = handleFormSubmit();

//         if (!name || !email){
//             alert("Please fill out all required fields.");
//             return;
//         }

//         // Checking that user exists or not, if not then we will add one.
//         if(!userMap.has(email)){
//             const newUser = new User(name, email);
//             userMap.set(email,newUser);
//             updateUserDropdown();
//             localStorage.setItem(userListKey, JSON.stringify(Array.from(userMap.values()).map(user => user.toData())));
//             updateUserDropdown();
//             alert("New user added successfully");
//             document.getElementById("user-data").reset();
//         }
//         else{
//             alert(`User with email ${email} already exists.`);
//         }
//     });



//     // User selection
//     document.getElementById("choose-user").addEventListener("change", handleUserSelection);

//     // Task addition
//     document.getElementById("add-task").addEventListener("click",(event) => {
//         event.preventDefault();
//         const {task, description, priority , status, dueDate} = handleTaskData();

//         if (!task){
//             alert("Please add a task");
//             return;
//         }

//         if(!dueDate){
//             alert("Please add a due Date");
//             return;
//         }

//         console.log("task is ",task, "<br> description is ", description, "<br> priority is ", priority, "<br> status is ",status,"<br> dueDate is ",dueDate )
//         const existingTask = currentUser.taskList.find(existingTask =>
//             existingTask.task === task );

//         if (!existingTask){

//             // currentUser.addTasks(task);
//             currentUser.addTasks(task,description,status,priority,dueDate);

//             localStorage.setItem(userListKey, JSON.stringify(Array.from(userMap.values()).map(user => user.toData())));
//             displayTasks();
//             alert("Task created successfully.");
//             document.getElementById("task-creation").reset();
//         }
//         else{
//             alert("Task already exists. Try adding another task!");
//         }
//     });


//     document.getElementById("back-to-home").addEventListener("click", handleBackToHome);
// }



// // Initialize the application
// function initializeApp(){
//     updateUserDropdown();
//     setupEventListeners();
//     pageManager.showPage('home');
// }

// initializeApp();

// // ##################################################
// // import { handleFormSubmit,handleTaskData } from "./ui.js";
// // import {User, StorageProxy } from "./data.js";
// // import { PageManager } from "./navigation.js";

// // const userList = new StorageProxy([], 'userList');
// // let currentUser = null;
// // const pageManager = new PageManager();

// // // Updating user dropdown
// // function updateUserDropdown(){
// //     const dropdown = document.getElementById("choose-user");
// //     const userDropdownContainer = document.getElementById("user-dropdown");

// //     // If no user exist, then don't show the dropdwon.
// //     if(!userList.length){
// //         userDropdownContainer.style.display = "none";
// //         return;
// //     }

// //     dropdown.innerHTML = '<option value="" disabled selected> Choose an option</option>';
// //     userDropdownContainer.style.display = "block";
// //     userList.forEach((user, index) => {
// //         const optionElement = document.createElement('option');
// //         optionElement.value = index;
// //         optionElement.textContent = user.username;
// //         dropdown.appendChild(optionElement);
// //     }
// // );

// // }

// // // Choosing user from user selection dropdown.
// // function handleUserSelection(event){
// //     const selectedIndex = event.target.value;
// //     currentUser = userList[selectedIndex];

// //     updateProfileView(currentUser);
// //     pageManager.showPage('profile');
// // }

// // // Basically updating the profile data after showing the profile page.
// // function updateProfileView(user){
// //     const para = document.querySelector("#user-profile p");
// //     para.innerHTML = '';
// //     const user_obj = document.createElement("h1");
// //     user_obj.textContent = `Hi ${user.username}!`;
// //     para.appendChild(user_obj);
// // }

// // function handleBackToHome(){
// //     pageManager.showPage('home');
// //     currentUser = null;
// //     updateUserDropdown();

// // }

// // function setupEventListeners(){
// //     document.getElementById("submitBtn").addEventListener("click", (event) => {
// //         event.preventDefault();
// //         const {name, email } = handleFormSubmit();

// //         if (!name || !email){
// //             alert("Please fill out all required fields.");
// //             return;
// //         }

// //         const existingUser = userList.find(user => user.email === email);

// //         if(!existingUser){
// //             const newUser = new User(name, email);
// //             userList.push(newUser);
// //             alert("New user added successfully");
// //             document.getElementById("user-data").reset();

// //             updateUserDropdown();
// //         }else{
// //             alert(`User with email ${email} already exists.`);
// //         }
// //     });

// //     // User selection
// //     document.getElementById("choose-user").addEventListener("change", handleUserSelection);

// //     // Task addition
// //     document.getElementById("add-task").addEventListener("click",(event) => {
// //         event.preventDefault();
// //         const {task} = handleTaskData();

// //         if (!task){
// //             alert("Please add a task");
// //             return;
// //         }

// //         const existingTask = currentUser.taskList.find(existingTask =>
// //             existingTask.task === task );

// //         if (!existingTask){
// //             currentUser.addTasks(task);
// //             alert("Task created successfully");
// //             document.getElementById("task-creation").reset();
// //         }
// //         else{
// //             alert("Task already exists. Try adding another task!");
// //         }
// //     });

// //     document.getElementById("back-to-home").addEventListener("click", handleBackToHome);
// // }



// // // Initialize the application
// // function initializeApp(){
// //     updateUserDropdown();
// //     setupEventListeners();
// //     pageManager.showPage('home');
// // }

// // initializeApp();

// // #################################################
// // import { handleFormSubmit, handleTaskData } from "./ui.js";
// // import { User,Task } from "./data.js";
// // import { PageManager } from "./navigation.js";

// // const userList = []; // Replace with StorageProxy for future enhancements
// // let currentUser = null;
// // const pageManager = new PageManager();

// // // Choosing user from user selection dropdown (modify based on your implementation)
// // function handleUserSelection(event) {
// //   // Implement logic to choose user from dropdown and update currentUser
// // }

// // function updateProfileView(user) {
// //   // Update profile view based on user data
// // }

// // function handleBackToHome() {
// //   // Handle going back to home page
// // }

// // function setupEventListeners() {
// //   document.getElementById("submitBtn").addEventListener("click", (event) => {
// //     event.preventDefault();
// //     const { name, email } = handleFormSubmit();

// //     if (!name || !email) {
// //       alert("Please fill out all required fields.");
// //       return;
// //     }

// //     const existingUser = userList.find(user => user.email === email);

// //     if (!existingUser) {
// //       const newUser = new User(name, email);
// //       userList.push(newUser);
// //       alert("New user added successfully");
// //       document.getElementById("user-data").reset();

// //       // Update user list for dropdown (if applicable)
// //     } else {
// //       alert(`User with email ${email} already exists.`);
// //     }
// //   });

// //   // User selection
// //   // document.getElementById("choose-user").addEventListener("change", handleUserSelection);

// //   // Task addition (not implemented yet)

// //   document.getElementById("back-to-home").addEventListener("click", handleBackToHome);
// // }

// // function initializeApp() {
// //   // Load user data from local storage (if using StorageProxy in the future)
// //   // updateUserDropdown(); // Update user list for dropdown (if applicable)
// //   setupEventListeners();
// //   PageManager.showPage('home');
// // }

// // initializeApp();

import { clearModalForm, handleFormSubmit, handleModalFormData, populateModalForm, showFormErrors, showSuccess } from "./ui.js";
import { User } from "./data.js";
// import {User, StorageProxy } from "./data.js";
import { PageManager } from "./navigation.js";
import { FormValidator } from "./validation.js";
import { DeletionManager } from "./deletionManagement.js";
import { tagHandler, updateTaskCardTags } from "./tagManagement.js";

// let selectedDueDate = null;
// export { selectedDueDate };

// document.addEventListener('DOMContentLoaded', function () {
//     flatpickr("#modal-dueDate", {
//         enableTime: true,
//         dateFormat: "Y-m-d H:i",
//         altInput: true,
//         altFormat: "F j, Y h:i K",
//         minDate: "today",
//         defaultDate:new Date(), // Start with today for new tasks.
//         onChange: (selectedDates) => {
//             selectedDueDate = selectedDates[0];
//             console.log("Selected Date/Time:", selectedDueDate, selectedDueDate.toISOString());
//         }
//     });
// });

// Show the global overlay
// export function showGlobalOverlay(){
function showGlobalOverlay() {
    document.querySelector('.global-overlay').style.display = 'block';
}

// Hide the global overlay
// export function hideGlobalOverlay(){
function hideGlobalOverlay() {
    document.querySelector('.global-overlay').style.display = 'none';
}

export const userListKey = 'userList';
export const userMap = new Map();

// Set for storing ids of selected tasks, to delete.
// const selectedTasks = new Set();


// SelectionBar (defining it globally because need access at multiple places)
// const selectionBar = document.querySelector('.selection-bar');

// *** code for selection manager
// let selectionManager = null; --> No more needed.
// const deletionManager = new DeletionManager();
// let deletionManager;
// deletionManager = new DeletionManager();
// deletionManager.setupTaskCheckboxes();

// document.addEventListener('DOMContentLoaded', () => {
//     deletionManager = new DeletionManager();
//     deletionManager.setupTaskCheckboxes();
// });


// For task editing and using it in displayTasks function, making this variables global

let isEditMode = false;
let editTaskId = null;
let modal = null;

// Load from local storage and populate the userMap
const storedUsers = JSON.parse(localStorage.getItem(userListKey)) || [];

storedUsers.forEach(userData => {
    const user = User.fromData(userData);
    userMap.set(user.email, user);

    // document.addEventListener('DOMContentLoaded', () => {
    //     displayTasks(user);
    // });
});

let userList = Array.from(userMap.values()); // Create userList from userMap

export let currentUser = null;
const pageManager = new PageManager();

// Populate user list
function populateUserList() {

    const selectUserBtn = document.getElementById("selectUserBtn");
    const userListElement = document.getElementById("userList");

    // Clear existing user list
    userListElement.innerHTML = '';

    // If no users exist, hide the select button and show message
    if (!userList.length) {
        selectUserBtn.style.display = "none";
        userListElement.innerHTML = `
        <div class="no-users-message">
        No existing users found. Please create an account first.
        </div>`;
        return;
    }

    // Show the select button if users exist
    selectUserBtn.style.display = "block";

    // Create user items
    userList.forEach((user, index) => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.dataset.index = index;

        // Get initials for avatar
        const initials = user.username
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        userItem.innerHTML = `
        <div class="user-avatar">${initials}</div>
        <div class="user-info">
        <div class="name">${user.username}</div>
        <div class="email">${user.email}</div>
        </div>
        `;

        // Add click handler
        userItem.addEventListener('click', () => {
            currentUser = userList[index];
            updateProfileView(currentUser);
            pageManager.showPage('profile');
            // const func = setupModalHandlers();
            // func.displayTasks(currentUser);
            displayTasks(currentUser, currentUser["taskList"]);
            userModal.classList.remove('active');
        });
        userListElement.appendChild(userItem);
    });
}

// For modal handling of user
function setupUserModal() {

    const userModal = document.getElementById("userModal");
    const selectUserBtn = document.getElementById("selectUserBtn");
    const closeUserModal = document.getElementById("closeUserModal");

    selectUserBtn.addEventListener("click", () => {
        userModal.classList.add('active');
    });

    closeUserModal.addEventListener("click", () => {
        userModal.classList.remove('active');
    })

    // Close modal if clicking outside
    userModal.addEventListener("click", (e) => {
        if (e.target === userModal) {
            userModal.classList.remove('active');
        }
    });

}

// Helper Function for getting status and priority emoji
const getStatusEmoji = (status) => {
    switch (status) {
        case 'not started': return '⭕';
        case 'in progress': return '⏳';
        case 'completed': return '✅';
        default: return '⭕';
    }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
const getPriorityEmoji = (priority) => {
    switch (priority) {
        case 'high': return '🔴';
        case 'medium': return '🟡';
        case 'low': return '🔵';
        default: return '⚪';
    }
};

// Creating a global variable, so that we can use customize taskList for different purposes, like sorting, view all tasks and showing few something like.
// let user_task_ls;
// let user_task_ls = currentUser["taskList"];

// *** No more need of user parameter as I am directly passing the current_task_ls based on needs. ***

function displayTasks(user, current_task_ls, message = "") {
    // console.log("User is ", user.username);
    // console.log("User is ", currentUser.username);
    console.log("user_task_ls inside displayTasks func. ", current_task_ls);
    console.log("I am inside displayTasks function. ");
    const taskDisplay = document.querySelector("#task-display");
    taskDisplay.innerHTML = '<div class="task-container"></div>';
    const cardContainer = taskDisplay.querySelector('.task-container');
    // Not updating it inside function.
    // const user_task_ls = user["taskList"];
    // USING "LET" OVER "CONST" BECAUSE DEFINING THIS VARIABLE AT MULTIPLE PLACES.
    let user_task_ls = current_task_ls;
    // if(sorting){
    //     // Then use sorting userList.
    //     // user_task_ls = 
    // }



    // const tagModal = document.getElementById('tag-modal');

    // const openTagModal = document.querySelector('.tag-button');
    // const closeTagModal = document.getElementById('close-tag-modal');

    // closeTagModal.addEventListener("click", () => {
    //     tagModal.style.display = "none";
    // });

    console.log("got the message: ", message);

    // if (message) {
    //     // cardContainer.innerHTML = `<p class="no-tasks-message">${message}</p>`
    //     // taskCard.innerHTML = `<p class="no-tasks-message">${message}</p> `;
    // }

    if (message) {
        cardContainer.innerHTML = `<div class="no-tasks-container"><p class="no-tasks-message">${message}</p></div>`;
    }

    else {
        // *** Creating the task card ***

        for (const task of user_task_ls) {
            const taskCard = document.createElement("div");
            taskCard.className = "task-card";

            // Convert the task's due date to a formatted string
            const dueDate = new Date(task.dueDate);
            const formattedDate = dueDate.toLocaleDateString() + ' ' + dueDate.toLocaleTimeString();

            // taskCard.innerHTML = `
            //     <div class="card-header">
            //         <h3 class="task-title">${task.task}</h3>
            //         <div class="status-priority>
            //             <div class="status-badge" data-status="${task.status.toLowerCase()}">${getStatusEmoji(task.status)}</div>
            //             <div class="priority-flag" data-priority="${task.priority.toLowerCase()}">
            //                 <span>${getPriorityEmoji(task.priority)}</span>
            //                 <span>${capitalize(task.priority)}</span>
            //             </div>
            //         </div>
            //     </div>

            //     <!-- For showing added tags later on(basically future add-ons) -->

            //     <!-- Container for showing tag modal when clicking on add tag button  -->
            //     <div class="tags-container">
            //     </div>

            //     <div class="card-footer">
            //         <button class="tag-button" data-task-id ="${task.task_id}">
            //             <span class="tag-icon">+</span>
            //             <span>Add Tag</span>
            //         </button>
            //         <button class="reminder-btn" title="${formattedDate}" date-has-reminder="true">
            //             <span>🔔</span>
            //         </button>
            //     </div> `;

            // Determine if the reminder is active (due date is in the future.)
            const isActive = dueDate > new Date();

            // Create the bell icon HTML with appropriate state
            const bellIconHTML = `
            <button class="reminder-button" id="reminder-btn-${task.task_id}" data-task-id="${task.task_id}" ${task.dueDate ? 'data-reminder="active"' : ''}>
                <span class="bell-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                </span>
                <div class="reminder-tooltip">${task.dueDate ? 'Set reminder (' + formattedDate + ')' : 'Set date and time'}</div>
            </button>`;

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
                
            // <button class="reminder-button" id="reminder-btn-${task.task_id}" data-task-id="${task.task_id}" title="${formattedDate}" date-has-reminder="true">
            //     <span>🔔</span>
            // </button>
            taskCard.dataset.taskId = task.task_id;

            //*** Clearing tags from all the tasks in one go ***

            // task.tagsSet.clear();
            // user.customTags.clear();
            // localStorage.setItem(userListKey, JSON.stringify(
            //     Array.from(userMap.values()).map(user => user.toData())
            // ));
            cardContainer.appendChild(taskCard);
            // updateTaskCardTags(task);
            updateTaskCardTags(task, userListKey, userMap);

            // Just clearing customTags from sudhanshu user, for testing or for proper data.
            //*** For clearing individual task tagsSet. ***
            // task.tagsSet.clear();
            // user.customTags.clear();

            // localStorage.setItem(userListKey, JSON.stringify(
            //     Array.from(userMap.values()).map(user => user.toData())
            // ));



            // console.log("customTags are ", customTags);

            // id="reminder-btn-${task.task_id}"
            // ******************************************
            /* <button class="tag-button" id="tag-btn" data-task-id="${task.task_id}" */
            // deletionManager = new DeletionManager();
            // deletionManager.setupTaskCheckboxes();
            // *******************************************************
            // // Selecting all the checkboxes
            // const checkboxes = document.querySelectorAll('.task-checkbox');
            // checkboxes.forEach(checkbox => {
            //     checkbox.addEventListener('change',function() {
            //         const taskId = this.dataset.task_id;
            //         if (this.checked) {
            //             selectedTasks.add(taskId);
            //         }
            //         else {
            //             // Set does nothing if taskId not exist in set.
            //             // if (selectedTasks.has(taskId)){
            //                 selectedTasks.delete(taskId);
            //             // }
            //         }

            //         // Update selection bar visibility and counter
            //         const selectionBar = document.querySelector('.selection-bar');
            //         // Basically means, if any task is selected.
            //         if (selectedTasks.size > 0) {
            //             selectionBar.style.display = 'flex';
            //             selectionBar.querySelector('.selected-count').textContent = 
            //             `${selectedTasks.size} selected`;
            //         }
            //         else {
            //             selectionBar.style.display = 'none';
            //         }
            //     });
            // });

            // *************************************

            // taskCard.querySelector('.tag-button').dataset.taskid = task.task_id;
            // Add click handler for editing(i.e. allow to edit only if it is not click at any button like add tag, notify or tags chip itself.)
            // taskCard.addEventListener("click", (e) => {
            //     console.log("e.target is ", e.target);

            //     if(e.target.matches('.tag-button') || e.target.closest('.tag-button') ){
            //         e.stopPropagation();
            //         // const button = e.target.matches('.tag-button') ? e.target: e.target.closest('tag-button');
            //         const taskId = task.task_id;
            //         console.log("tag button clicked for task: ", taskId);
            //         tagModal.dataset.taskid = taskId;
            //         tagModal.style.display = 'block';
            //         tagHandler(user, predefinedTags, tagModal);
            //         return;
            //     }

            //     if (e.target.matches('.reminder-button') || e.target.closest('.reminder-button')){
            //         e.stopPropagation();
            //         console.log("Reminder button clicked for task: ", task.task_id);
            //         return;
            //     }

            //     if (e.target.matches('.task-checkbox') || e.target.matches('.delete-icon')){
            //         console.log("Checkbox ro delete icon clicked");
            //         return;
            //     }

            //     console.log("Task card clicked, opening edit modal");
            //     document.getElementById("modal-title").textContent = "Update Task";
            //     isEditMode = true;
            //     editTaskId = task.task_id;
            //     populateModalForm(task);
            //     modal.style.display = "block";
            // });

            //         const tagButton = taskCard.querySelector('.tag-button');
            //         const reminderButton = taskCard.querySelector('.reminder-button');
            //         // const tagButton = document.getElementById("tag-btn-${task.task_id}");
            //         // const reminderButton = document.getElementById("reminder-btn-");

            //         console.log("tagButton is ", tagButton);
            //         console.log('reminderButton is ', reminderButton);


            //         tagButton.addEventListener('click', (e) => {
            //             console.log("tagButton is ", tagButton);
            //             e.stopPropagation();
            //             const taskId = task.task_id;
            //             console.log("Tag button clicked for task:", taskId);
            //             tagModal.dataset.taskid = taskId;
            //             tagModal.style.display = 'block';
            //             tagHandler(user,predefinedTags,tagModal);
            //         });

            //         reminderButton.addEventListener('click', (e) => {
            //             e.stopPropagation();
            //             console.log("Reminder button clicked for task:", task.task_id);
            //         });

            //         taskCard.addEventListener("click", (e) => {

            //             // Check if the click is on a checkbox or delete icon
            //             if (e.target.matches('.task-checkbox') ||
            //                 e.target.closest('.task-checkbox') ||
            //                 e.target.matches(".delete-icon") ||
            //                 e.target.closest(".delete-icon")){
            //             return;
            //         }

            //         console.log("Task card clicked, opening edit modal");
            //         document.getElementById("modal-title").textContent = "Update Task";
            //         isEditMode = true;
            //         editTaskId = task.task_id;
            //         populateModalForm(task);
            //         modal.style.display = "block";
            //         });

        }

    }

    // *** NOTE:- Need to add this code inside displayTasks function because we are dynamically creating this elements, so can't be found outside of this, in order to do anything with them, we have to do it here(where creation is happening.) ***
    // Code for not allowing delete icon and checkbox to show when hover or working with tag chip, reminder button or add tab button.

    document.querySelectorAll('.tag-button, .reminder-button, .task-tag').forEach(element => {
        element.addEventListener('mouseenter', function () {
            // Find the parent task card
            const taskCard = this.closest('.task-card');
            if (taskCard) {
                // Add a class to indicate an interactive element is being hovered
                taskCard.classList.add('interactive-hover');
            }
        });

        element.addEventListener('mouseleave', function () {
            // Find the parent task card
            const taskCard = this.closest('.task-card');
            if (taskCard) {
                // Remove the class when hover ends
                taskCard.classList.remove('interactive-hover');
            }
        });
    });

    function handleTaskDisplayClick(event) {

        // More detailed checks for tag button

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

        // Handle reminder button clicks
        if (event.target.matches('.reminder-button') || event.target.closest('.reminder-button')) {
            event.stopPropagation();
            const reminderButton = event.target.closest('.reminder-button');
            const taskId = event.target.closest('.task-card').dataset.taskId;
            console.log("Reminder button clicked for task: ", taskId);

            // Toggle the UI state for the reminder button
            reminderButton.classList.toggle('setting-reminder');

            // Update the bell icon based on state
            const bellIcon = reminderButton.querySelector('.bell-icon');
            if (reminderButton.classList.contains('setting-reminder')){
                // Change to bell with sound waves
                bellIcon.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
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

        // If it's a task card but not a button
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
            // Finding the task object
            const task = current_task_ls.find(t => t.task_id === taskId);
            console.log("task is ", task);
            populateModalForm(task);
            modal.style.display = "block";
        }
    }

    // Add a single event listener to handle all task card interactions.
    taskDisplay.removeEventListener("click", handleTaskDisplayClick);
    taskDisplay.addEventListener("click", handleTaskDisplayClick);

}


// for (const task of user_task_ls) {
//     const taskCard = document.createElement("div");
//     taskCard.className = "task-card";

//     // Convert the task's due date to a formatted string
//     const dueDate = new Date(task.dueDate);
//     const formattedDate = dueDate.toLocaleDateString() + ' ' + dueDate.toLocaleTimeString();

//     // taskCard.innerHTML = `
//     //     <div class="card-header">
//     //         <h3 class="task-title">${task.task}</h3>
//     //         <div class="status-priority>
//     //             <div class="status-badge" data-status="${task.status.toLowerCase()}">${getStatusEmoji(task.status)}</div>
//     //             <div class="priority-flag" data-priority="${task.priority.toLowerCase()}">
//     //                 <span>${getPriorityEmoji(task.priority)}</span>
//     //                 <span>${capitalize(task.priority)}</span>
//     //             </div>
//     //         </div>
//     //     </div>

//     //     <!-- For showing added tags later on(basically future add-ons) -->

//     //     <!-- Container for showing tag modal when clicking on add tag button  -->
//     //     <div class="tags-container">
//     //     </div>

//     //     <div class="card-footer">
//     //         <button class="tag-button" data-task-id ="${task.task_id}">
//     //             <span class="tag-icon">+</span>
//     //             <span>Add Tag</span>
//     //         </button>
//     //         <button class="reminder-btn" title="${formattedDate}" date-has-reminder="true">
//     //             <span>🔔</span>
//     //         </button>
//     //     </div> `;


//     taskCard.innerHTML = `
//         <div class="task-selection">
//             <div class="task-checkbox-wrapper">
//                 <input type="checkbox" class="task-checkbox" data-task-id="${task.task_id}">
//                 <div class="checkbox-custom"></div>
//             </div>
//             <i class="material-icons delete-icon" data-task-id="${task.task_id}">delete</i>
//         </div>

//         <div class="card-header">
//             <h3 class="task-title">${task.task}</h3>
//             <div class="status-priority">
//                 <div class="status-badge" data-status="${task.status.toLowerCase()}">${getStatusEmoji(task.status)}</div>
//                 <div class="priority-flag" data-priority="${task.priority.toLowerCase()}">
//                     <span>${getPriorityEmoji(task.priority)}</span>
//                     <span>${capitalize(task.priority)}</span>
//                 </div>
//             </div>
//         </div>

//         <div class="tags-container"> </div>


//         <div class="card-footer">
//             <button class="tag-button" ">
//                 <span class="tag-icon">+</span>
//                 <span>Add Tag</span>
//             </button>
//             <button class="reminder-btn" title="${formattedDate}" date-has-reminder="true">
//                 <span>🔔</span>
//             </button>
//         </div> `;

//     // ******************************************

//     // deletionManager = new DeletionManager();
//     // deletionManager.setupTaskCheckboxes();
//     // *******************************************************
//     // // Selecting all the checkboxes
//     // const checkboxes = document.querySelectorAll('.task-checkbox');
//     // checkboxes.forEach(checkbox => {
//     //     checkbox.addEventListener('change',function() {
//     //         const taskId = this.dataset.task_id;
//     //         if (this.checked) {
//     //             selectedTasks.add(taskId);
//     //         }
//     //         else {
//     //             // Set does nothing if taskId not exist in set.
//     //             // if (selectedTasks.has(taskId)){
//     //                 selectedTasks.delete(taskId);
//     //             // }
//     //         }

//     //         // Update selection bar visibility and counter
//     //         const selectionBar = document.querySelector('.selection-bar');
//     //         // Basically means, if any task is selected.
//     //         if (selectedTasks.size > 0) {
//     //             selectionBar.style.display = 'flex';
//     //             selectionBar.querySelector('.selected-count').textContent = 
//     //             `${selectedTasks.size} selected`;
//     //         }
//     //         else {
//     //             selectionBar.style.display = 'none';
//     //         }
//     //     });
//     // });

//     // *************************************

//     taskCard.querySelector('.tag-button').dataset.taskid = task.task_id;
//     // Add click handler for editing(i.e. allow to edit only if it is not click at any button like add tag, notify or tags chip itself.)
//     taskCard.addEventListener("click", (e) => {

//         // If clciked on checkbox or delete icon, don't open modal.
//         if (e.target.closest('.task-checkbox') || e.target.closest('.delete-icon')) {
//             return;
//         }

//         // If clicked on tag button or reminder button, don't open modal.
//         // if (e.target.closest('.tag-button') ||e.target.closest('.reminder-btn')){
//         //     return;
//         // }

//         // **************************** Check this part *************************
//         // This condition is sort of redundant, but let's add it for now.
//         if (!e.target.closest('.tag-button') && !e.target.closest('.reminder-btn')) {
//             document.getElementById("modal-title").textContent = "Update Task";
//             isEditMode = true; // Using the global variable
//             editTaskId = task.task_id; // Using the global variable
//             populateModalForm(task);
//             modal.style.display = "block";
//             // Added later on, after working with delete functionality.
//         }

//         // else if (e.target.closest('.tag-button')) {
//         else if (e.target.closest('.tag-button')) {
//             const button = e.target.closest('.tag-button');

//             // Setting the task_id to tagModal from tagButton.
//             const taskId = button.dataset.taskid;
//             console.log("taskId at button is ", taskId);
//             tagModal.dataset.taskid = taskId; // Set taskId on the modal
//             tagModal.style.display = 'block';
//             tagHandler(user, predefinedTags, tagModal);
//             console.log(tagModal.dataset.taskid);
//         }
//     });

//     cardContainer.appendChild(taskCard);

// }

// Initialize selection manager if not already done
// if (!selectionManager) {
//     selectionManager = new SelectionManager();
// }

// ******** This will cause multiple event listeners to get attached to setupTaskCheckboxes(); or all the delete functionality.
// Setup checkboxes for all tasks
// deletionManager.setupTaskCheckboxes();

// Calling the handleDelete() of selectionManager class.
// Handle complete delete functionality.
// Calling the delete function ----> Not exist.
// deletionManager.handleDelete(user);
// Updating in local storage
// ........
// localStorage.setItem(user.username, JSON.stringify(user.toData()));
// ........
// Displaying the updated taskList.
// return {update_details};
// return { displayTasks };




// console.log("selectedtasks  count is ", selectedTasks.size);
// console.log("selectedTasks are : ", Array.from(selectedTasks));

// Deletion call code starting.
//*** */ I don't think I should add this in app.js (because I am handling everything in my selectionManager.js and data.js file, so don't need feel any need to do this here. but ofcourse i need to call displayTasks(user) after deletion.)

// export function handleTaskDeletion(user) {

//     // user.deleteTask()
//     localStorage.setItem(currentUser.username, JSON.stringify(user.toData()));
//     displayTasks(user);
// }

// *** Deletion call code


// Notification center code
// *** Will add uuid to user if needed, right now username is fine. ***

// function notificationCenter(){

    // *** Written by me ***
    // Need to open the notification modal
    // const notificationModal = document.querySelector('.notification-modal');
    // const openButton = document.querySelector('.notification-center-button');
    // const closeButton = document.querySelector('.notification-modal-header .close-button');

    // console.log("notificatoinModal is ", notificationModal);
    // console.log("openButton is ", openButton);
    // console.log("closeButton is ", closeButton);

    // openButton.addEventListener('click',() => {
    //     notificationModal.style.display = 'block';
    // });

    // closeButton.addEventListener('click',() =>{
    //     notificationModal.style.display = 'none';
    // });

    // ######################################################
    // Handle clicks outside the panel
    // *** Here, I don't know how to pass the event, have to figure it out. ***
    // function handleOutsideClick(e) {
    //     // Does it mean that we haven't click on notification modal and it do mean that we clicked outside, so close the notification modal.
    //     if (!notificationModal.contains(e.target)){
    //         console.log("e.target is ", e.target);
    //         notificationModal.style.display = 'none';
    //     }
    // }

    // handleOutsideClick();

    // ??? is there any need of this function and what we are doing in fitlerPanel, handleOutsideClick function ???
    // Does it mean that we haven't click on notification modal and it do mean that we clicked outside, so close the notification modal.
    // if (!notificationModal.contains(e.target)){
    //     console.log("e.target is ", e.target);
    //     notificationModal.style.display = 'none';
    // }
    
function notificationCenter(){

    const modalWrapper = document.querySelector('.notification-modal-wrapper');
    const openButton = document.querySelector('.notification-center-button');
    const closeButton = document.querySelector('.notification-modal-header .close-button');

    // Opening the modal
    openButton.addEventListener('click', () => {
        //??? What is flex exactly in style or what it do ???
        modalWrapper.style.display = 'flex';
    });

    // Closing the  modal
    closeButton.addEventListener('click', () => {
        modalWrapper.style.display = 'none';
    });

    // Close when clicking outside the modal.
    modalWrapper.addEventListener('click', (e) => {
        if (e.target === modalWrapper){
            modalWrapper.style.display = 'none';
        }
    });
}
// console.log("User is ", currentUser.username);

// *** Notification toggle code ***
// const notificationToggle = document.querySelector('.toggle-switch input[type="checkbox"]');

// Click was wrong event listener as it is forcefully trying to change the state of checkbox or toggle, browser automatically  handle the checked and unchecked state of checkbox(slider in our case.)

// notificationToggle.addEventListener('click', () =>{

//     if(!notificationToggle.checked){
//         console.log("Notification togglee ", notificationToggle);
//         console.log("Notification togglee checked or not? ", notificationToggle.checked);
//         notificationToggle.checked = true;
//         console.log("Notification toggle is ", notificationToggle.checked);
//     }
//     else{
//         console.log("Notification togglee ", notificationToggle);
//         console.log("Notification togglee checked or not? ", notificationToggle.checked);
//         notificationToggle.checked = false;
//         console.log("Notification toggle is ", notificationToggle.checked);
//     }
// });

// const notificationToggle = document.querySelector('.toggle-switch input[type="checkbox"]');
// notificationToggle.addEventListener('change', () => {
//     if (notificationToggle.checked) {
//         console.log("Notifications enabled");
//         // Run your "enabled" logic here
//     } else {
//         console.log("Notifications disabled");
//         // Run your "disabled" logic here
//     }
// });


// document.getElementById(notification-btn-${currentUser.username})
function setupModalHandlers() {
    // Hiding and disabling all the things in background when task modal is open either for editing/adding task.
    showGlobalOverlay();

    // let modal = document.getElementById("task-modal");
    modal = document.getElementById("task-modal");
    const openButton = document.getElementById("open-task-modal");
    const closeButton = document.getElementById("close-modal");
    // let isEditMode = false;
    // let editTaskId = null;

    openButton.addEventListener("click", () => {
        document.getElementById("modal-title").textContent = "Add Task";
        clearModalForm();
        modal.style.display = "block";
        isEditMode = false;

    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        clearModalForm();
    });


    // Calling the handleTaskSubmit function to handle task editing and adding functionality.
    document.getElementById("task-form").addEventListener("submit", handleTaskSubmit);
    // *** Earlier version of code for task edit and task adding feature ***

    // document.getElementById("task-form").addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     const formData = handleModalFormData();

    //     const errors = FormValidator.validateTaskForm(formData);
    //     if (errors.length > 0) {
    //         showFormErrors(errors, 'task-form');
    //         return;
    //     }
    //     try {
    //         if (isEditMode && editTaskId) {
    //             // Handle Update
    //             // const taskIndex = currentUser.taskList.findIndex(task => task.task_id === editTaskId);
    //             // if (taskIndex !== -1) {
    //             //     currentUser.taskList[taskIndex] = { ...currentUser.taskList[taskIndex], ...formData };
    //             //     localStorage.setItem(userListKey, JSON.stringify(Array.from(userMap.values()).map(user => user.toData())));
    //             //     alert("Task updated successfully!");
    //             // }

    //             // Better move, to check that the changed task name is not same as some other existing task.

    //             // For updates, check if the task name changes
    //             const otherTasks = currentUser.taskList.filter(task => task.task_id != editTaskId);
    //             const taskExists = otherTasks.some(task => task.task === formData.task);

    //             if (taskExists) {
    //                 // alert("Task name already exists. Please choose a different name.")
    //                 showFormErrors(['Task name already exists'], 'task-form');
    //                 return;
    //             }
    //             if (currentUser.updateTask(editTaskId, formData)) {
    //                 localStorage.setItem(userListKey, JSON.stringify(Array.from(userMap.values().map(user => user.toData()))));
    //                 showSuccess('Task updated successfully');
    //                 modal.style.display = "none";
    //                 clearModalForm();
    //                 // alert("Task updated successfully!");
    //                 // showSuccess('Task updated successfully');
    //                 displayTasks(currentUser);

    //             }

    //         }
    //         else {
    //             // Handle new task creation
    //             const existingTask = currentUser.taskList.find(task => task.task === formData.task);
    //             if (existingTask) {
    //                 showFormErrors(['Task already exists'], 'task-form');
    //                 // alert("Task already exists. Try adding another task!");
    //                 return;
    //             }
    //             currentUser.addTasks(formData.task, formData.description, formData.status, formData.priority, formData.dueDate);
    //             localStorage.setItem(userListKey, JSON.stringify(Array.from(userMap.values()).map(user => user.toData())));
    //             showSuccess('Task created successfully');
    //             // alert("Task created successfully!");
    //         }
    //         modal.style.display = "none";
    //         clearModalForm();
    //         displayTasks(currentUser);
    //     }
    //     catch (error) {
    //         showFormErrors([error.message], 'task-form');
    //     }

    // });

    // After closing the task modal, things will again become accessible or enable.
    hideGlobalOverlay();

}


// *** Search functionality

// const searchInput = document.querySelector(".search-container input");
// let searchTaskList = [];

// searchInput.addEventListener("input", () => {
//     const inputValue = searchInput.value;
//     console.log("inputValue is ", inputValue);
//     // Iterating task of current user
//     let tempList = [];
//     currentUser.taskList.forEach(taskCard =>{
//         // const tempList = [];
//         // console.log("looping taskCard.task is ", taskCard.task);
//         // console.log("looping taskCard.description is ", taskCard.description);
//         const taskMatch = taskCard.task.includes(inputValue);
//         if (taskMatch) {
//             console.log("task is",taskCard.task);
//         }
//         console.log("taskMatch is ", taskMatch);
//         const descriptionMatch = taskCard.description.includes(inputValue);
//         console.log("descriptionMatch is ", descriptionMatch);
//         // if ((task.task.startsWith(inputValue)) || (task.description.startsWith(inputValue))){

//         // If search input is empty, then do nothing.
//         // if (inputValue.trim() === ""){
//         //     console.log("Search input is empty. ");
//         //     return;
//         // }

//         // // If searchInput is not empty and match is not found, then return a message.
//         // else if ((inputValue.trim() !== "") && (!((taskMatch || descriptionMatch)))){
//         //     console.log("No matching task, try something else...");
//         // }

//         // else if (taskMatch || descriptionMatch){
//         //     searchTaskList.push(task);
//         // }

//         if (taskMatch || descriptionMatch){
//             tempList.push(taskCard);
//                 // searchTaskList.push(taskCard);
//                 console.log("searchtaskls: ", searchTaskList);
//         }
//         else {
//             console.log("No matching task, try something else...");
//         }
//     });
//     // if (searchTaskList.length !==0 ){
//     //     console.log("searchTaskList is ", searchTaskList);
//     // }
//     if (searchTaskList.length === 0 ){
//         searchTaskList = tempList;
//         console.log("searchTaskList is ", searchTaskList);
//     }
//     else {
//         tempList.forEach(temp => {
//             if (! (searchTaskList.includes(temp))){
//                 console.log("temp is ", temp);
//                 searchTaskList.push(temp);
//             }
//         });
//         console.log("searchTaskList inside else is ", searchTaskList);
//     }
// });



const searchInput = document.querySelector(".search-container input");
const debouncedSearch = _.debounce(() => {
    const inputValue = searchInput.value.trim();
    if (inputValue === "") {
        displayTasks(currentUser, currentUser.taskList);
        return; // Exit early to avoid unnecessary filtering
    }

    const escapedInput = inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedInput, "i");
    // const regex = new RegExp(inputValue, "i");
    const searchTaskList = currentUser.taskList.filter(task =>
        regex.test(task.task) || regex.test(task.description)
    );


    if (inputValue !== "" && searchTaskList.length === 0) {
        displayTasks(currentUser, [], "No tasks match your search.")
    } else {
        displayTasks(currentUser, searchTaskList);
    }

}, 200);

searchInput.addEventListener("input", debouncedSearch);

// searchInput.addEventListener("input", () => {
//     const inputValue = searchInput.value.trim();
// //     const searchTaskList = [];
// //     // 'i' is for handling case insensitivity.
// //     const regex = new RegExp(inputValue, "i");

// //     currentUser.taskList.forEach(task => {
// //       const taskMatch = regex.test(task.task);
// //       const descriptionMatch = regex.test(task.description);

// //       if (taskMatch || descriptionMatch) {
// //         searchTaskList.push(task);
// //       }

// //       // Conditional logging for debugging
// //       if (taskMatch) {
// //         console.log(`Task "${task.task}" matched.`);
// //       }
// //       if (descriptionMatch) {
// //         console.log(`Description "${task.description}" matched.`);
// //       }
// //     });

// //     console.log("Search results:", searchTaskList);
//     const regex = new RegExp(inputValue, "i");
//     const searchTaskList = currentUser.taskList.filter(task => 
//         regex.test(task.task) || regex.test(task.description)
//     );

//     if (inputValue !== "" && searchTaskList.length === 0 ){
//         displayTasks(currentUser , [], "No tasks match your search.")
//     }else {
//         displayTasks(currentUser, searchTaskList);
//     }

//   });

//***  Handling filter operation. ***

// const filterBtn = document.getElementById("open-filter-panel");
// filterBtn.addEventListener("click",() => {
//     const filterPanel = document.querySelector('.filter-panel');
//     filterPanel.classList.add('active');
// });

// const closeFilterBtn = document.getElementById('close-filter-panel');
// closeFilterBtn.addEventListener("click",() => {
//     const filterPanel = document.querySelector('.filter-panel');
//     filterPanel.classList.remove('active');
// });

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.querySelector('.app-container');
    const filterPanel = document.querySelector('.filter-panel');
    const filterBtn = document.getElementById('open-filter-panel');
    const closeFilterBtn = document.getElementById('close-filter-panel');
    const clearFilterBtn = document.getElementById('clear-filters');

    // Code created by me.

    // currentUser is globally defined, therefore using currentUser over user.
    // clearFilterBtn.addEventListener("click", () => {
    //     // displayTasks(currentUser, currentUser.taskList);
    //     const checkbox = e.target.closest('input[type="checkbox"]');
    //     console.log("checkbox inside clearFilterBtn is ", checkbox);
    //     if (checkbox) {
    //         checkbox.checked =false;
    //     }
    //     closeFilterPanel();
    // });

    clearFilterBtn.addEventListener("click", () => {
        document.querySelectorAll('.filter-panel input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        updateFilters();
        closeFilterPanel();

    });



    // Function to handle panel opening.
    function openFilterPanel() {
        filterPanel.classList.add('active');
        appContainer.classList.add('filter-active');

        // Allow time for transition (need to know that does it mean, cancel the filter panel after 10 sec.)
        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
        }, 10);
    }

    function closeFilterPanel() {
        filterPanel.classList.remove('active');
        appContainer.classList.remove('filter-active');
        document.removeEventListener('click', handleOutsideClick);
        // displayTasks(currentUser,currentUser.taskList);
        updateFilters();
    }

    // Handle clicks outside the panel
    function handleOutsideClick(e) {
        // If not clicking on anywhere inside filter panel
        if (!filterPanel.contains(e.target) &&
            // If not clicking on filter button
            !filterBtn.contains(e.target) &&
            // And if filter panel is active or open, then close it
            filterPanel.classList.contains('active')) {

            // closeFilterPanel();
            clearFilterBtn.click();
        }
    }
    // Updated code, now using checkboxes over radio buttons and multiselect for all the filters.

    // Adding event listener to the entire filter panel for handling checkbox selection
    filterBtn.addEventListener('click', openFilterPanel);
    closeFilterBtn.addEventListener('click', closeFilterPanel);

    filterPanel.addEventListener('change', (e) => {
        const checkbox = e.target.closest('input[type="checkbox"]');
        console.log("checkboxes are ", checkbox);
        if (checkbox) {
            updateFilters();
        }

        // if (e.target.type === 'checkbox') {
        //     updateFilters();
        // }
    });

    function updateFilters() {
        const statusFilters = Array.from(document.querySelectorAll('input[name="status"]:checked')).map(cb => cb.value) || [];
        const priorityFilters = Array.from(document.querySelectorAll('input[name="priority"]:checked')).map(cb => cb.value) || [];
        const timeFilters = Array.from(document.querySelectorAll('input[name="time"]:checked')).map(cb => cb.value) || [];

        console.log('Active filters:', { status: statusFilters, priority: priorityFilters, time: timeFilters });
        console.log("currentUser taskList ", currentUser.taskList);
        const filteredTasks = filterTasks(currentUser.taskList, { status: statusFilters, priority: priorityFilters, time: timeFilters });
        console.log("Filtered tasks is ", filteredTasks);

        if (statusFilters.length === 0 && priorityFilters.length === 0 && timeFilters.length === 0) {
            // No filters selected, show all tasks
            displayTasks(currentUser, currentUser.taskList);
        }
        else if (filteredTasks.length === 0) {
            displayTasks(currentUser, [], "No tasks match your filters.");
            // return;
        }
        else {
            displayTasks(currentUser, filteredTasks);
        }

        // if (filteredTasks.length === 0){
        //     displayTasks(currentUser, currentUser.taskList);
        //     return;
        // }
        // displayTasks(currentUser, filteredTasks);
    }

    // Filter Tasks Function
    function filterTasks(tasks, filters) {
        return tasks.filter(task => {

            const normalizedTaskStatus = task.status.toLowerCase().trim()
            const normalizedTaskPriority = task.priority.toLowerCase().trim()

            const normalizedStatusFilters = filters.status.map(status => status.toLowerCase().trim());
            const normalizedPriorityFilters = filters.priority.map(priority => priority.toLowerCase().trim());

            const statusMatch = normalizedStatusFilters.length === 0 || normalizedStatusFilters.includes(normalizedTaskStatus);
            console.log("Task status:", task.status, "Normalized Task Status:", normalizedTaskStatus, "Filter statuses:", filters.status, "Normalized Filter Statuses:", normalizedStatusFilters, "statusMatch is ", statusMatch);

            const priorityMatch = normalizedPriorityFilters.length === 0 || normalizedPriorityFilters.includes(normalizedTaskPriority);
            console.log("Task priority:", task.priority, "Normalized Task priority:", normalizedTaskPriority, "Filter priority:", filters.priority, "Normalized Filter priority:", normalizedPriorityFilters, "priorityMatch is ", priorityMatch);

            const timeMatch = filters.time.length === 0 || checktimeFilter(task.dueDate, filters.time);
            console.log("timeMatch is ", timeMatch);

            return statusMatch && priorityMatch && timeMatch;
        });
    }

    // function filterTasks(tasks, filters) {
    //     return tasks.filter(task => {
    //         const statusMatch = filters.status.length === 0 || filters.status.includes(task.status);
    //         console.log("statusMatch is ", statusMatch);
    //         console.log("status which are included: ", filters.status.includes(task.status));
    //         const priorityMatch = filters.priority.length === 0 || filters.priority.includes(task.priority);

    //         console.log("priorityMatch is ", priorityMatch);
    //         console.log("Filters which are included: ", filters.priority.includes(task.priority));

    //         const timeMatch = filters.time === 0 || checktimeFilter(task.dueDate, filters.time);
    //         console.log("timeMatch is ", timeMatch);
    //         return statusMatch && priorityMatch && timeMatch;
    //     });
    // }

    function checktimeFilter(dueDate, timeFilters) {
        console.log("dueDate is ", dueDate);
        // Convert string dueDate to Date object if it’s a string
        let dateObj = dueDate;
        if (typeof dueDate === 'string') {
            dateObj = new Date(dueDate);
        }
        if (isNaN(dateObj.getTime())) return false; // Handle invalid dates

        console.log("Converted dueDate is ", dateObj);
        const today = new Date();
        console.log("today is ", today);
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() + 1 - today.getDay());
        console.log("startOfWeek ", startOfWeek);
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        console.log("startOfMonth ", startOfMonth);

        for (const timeFilter of timeFilters) {
            if (timeFilter === 'overdue' && dateObj < today) return true;
            if (timeFilter === 'today' && isToday(dateObj)) return true;
            if (timeFilter === 'this-week' && isThisWeek(dateObj, startOfWeek)) return true;
            if (timeFilter === 'this-month' && isThisMonth(dateObj, startOfMonth)) return true;
        }
        return false;

    }

    function isToday(date) {
        console.log("date is ", date);
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    function isThisWeek(date, startOfWeek) {
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        console.log("endOfWeek is ", endOfWeek);
        return date >= startOfWeek && date <= endOfWeek;
    }

    function isThisMonth(date, startOfMonth) {
        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
        // console.log("endOfMonth is ", endOfMonth);
        // return date >= startOfMonth && date <= endOfMonth;

        console.log("Checking date: ", date, "startOfMonth: ", startOfMonth, "endOfMonth: ", endOfMonth);

        const normalizedDate = new Date(date.setHours(0, 0, 0, 0));
        const normalizedStart = new Date(startOfMonth.setHours(0, 0, 0, 0));
        const normalizedEnd = new Date(endOfMonth.setHours(0, 0, 0, 0));
        return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
    }

    // filterBtn.addEventListener('click', openFilterPanel);
    // closeFilterBtn.addEventListener('click', closeFilterPanel);
});

// I can change the function name.
function sorting() {
    const sortContainer = document.querySelector('.sort-container select');
    const sortBy = sortContainer.value;

    // Sort function code
    let sortFunc;
    switch (sortBy) {
        case "dueDateAsc":
            sortFunc = (taskA, taskB) => {
                const dateA = new Date(taskA.dueDate);
                const dateB = new Date(taskB.dueDate);
                return dateA - dateB;
            };
            break;

        case "dueDateDesc":
            sortFunc = (taskA, taskB) => {
                const dateA = new Date(taskA.dueDate);
                const dateB = new Date(taskB.dueDate);
                return dateB - dateA;
            };
            break;

        case "priority":
            sortFunc = (taskA, taskB) => {
                const priorityOrder = {
                    "high": 0,
                    "medium": 1,
                    "low": 2
                };
                const orderA = priorityOrder[taskA.priority];
                const orderB = priorityOrder[taskB.priority];
                return orderA - orderB;

            };
            break;

        case "status":
            sortFunc = (taskA, taskB) => {
                const statusOrder = {
                    "completed": 0,
                    "in progress": 1,
                    "not started": 2
                };

                const orderA = statusOrder[taskA.status];
                const orderB = statusOrder[taskB.status];
                return orderA - orderB;
            };
            break;

        default:
            // sortFunc = "";
            sortFunc = (a, b) => 0;
    }
    // Current user is globally defined.
    // const user = currentUser;
    console.log("Current user is ", currentUser);
    // Creating a copy of the taskList(More specifically shallow copy.).
    const temp_taskList = [...currentUser["taskList"]];
    // or we can directly use.
    // const temp_taskList = currentuser["taskList"];
    console.log("Task list inside sorting function without apply sorting is ", currentUser["taskList"]);
    // Updating the temp_taskList.
    temp_taskList.sort(sortFunc);
    // let user_task_ls = temp_taskList;
    console.log("Default task list is ", currentUser["taskList"]);

    console.log("Sorted tasklist after applying sorting ", temp_taskList);
    console.log("I am inside sorting, about to call displayTasks function.");
    displayTasks(currentUser, temp_taskList);
    console.log("Called display task function.");
}


// Event listener for sorting
const sortDropdown = document.querySelector('.sort-container select');
sortDropdown.addEventListener('change', sorting);
// user_task_ls = currentUser["taskList"];

// Form submission handler

// Handling the default case of submitting the form by enter for both user and task form

document.addEventListener('DOMContentLoaded', function () {
    // Select both forms using their IDs
    const forms = document.querySelectorAll('#user-data , #task-form');

    forms.forEach(form => {
        form.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                if (event.target.tagName.toUpperCase() !== 'TEXTAREA') {
                    event.preventDefault();

                    const inputs = Array.from(form.querySelectorAll('input,select, textarea'));
                    const index = inputs.indexOf(event.target);
                    if (index > -1 && index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                }
            }
        });

        // For handling calender not appear outside of the modal, on entering in the select and date time field without selecting any date and time.
        const dateInput = form.querySelector('#modal-dueDate');
        if (dateInput) {
            dateInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    if (document.querySelector('.flatpickr-calender.open')) {
                        const fp = dateInput._flatpickr;
                        if (fp) fp.close();
                    }
                }
            });
        }
    });
});

function handleTaskSubmit(event) {
    event.preventDefault();
    const formData = handleModalFormData();

    const errors = FormValidator.validateTaskForm(formData);
    if (errors.length > 0) {
        showFormErrors(errors, 'task-form');
        return;
    }
    try {
        let user_task_ls = currentUser["taskList"];
        if (isEditMode && editTaskId) {
            // Updated taskList

            // Handle Update
            // const taskIndex = currentUser.taskList.findIndex(task => task.task_id === editTaskId);
            // if (taskIndex !== -1) {
            //     currentUser.taskList[taskIndex] = { ...currentUser.taskList[taskIndex], ...formData };
            //     localStorage.setItem(userListKey, JSON.stringify(Array.from(userMap.values()).map(user => user.toData())));
            //     alert("Task updated successfully!");
            // }

            // Better move, to check that the changed task name is not same as some other existing task.

            // For updates, check if the task name changes
            const otherTasks = currentUser.taskList.filter(task => task.task_id != editTaskId);
            const taskExists = otherTasks.some(task => task.task === formData.task);

            if (taskExists) {
                // alert("Task name already exists. Please choose a different name.")
                showFormErrors(['Task name already exists'], 'task-form');
                return;
            }
            if (currentUser.updateTask(editTaskId, formData)) {

                localStorage.setItem(userListKey, JSON.stringify(Array.from(userMap.values().map(user => user.toData()))));
                showSuccess('Task updated successfully');
                modal.style.display = "none";
                clearModalForm();

                // Task list
                // let user_task_ls = currentUser["taskList"];
                // alert("Task updated successfully!");
                // showSuccess('Task updated successfully');
                displayTasks(currentUser, user_task_ls);

            }

        }
        else {
            // Handle new task creation
            const existingTask = currentUser.taskList.find(task => task.task === formData.task);
            if (existingTask) {
                showFormErrors(['Task already exists'], 'task-form');
                // alert("Task already exists. Try adding another task!");
                return;
            }
            currentUser.addTasks(formData.task, formData.description, formData.status, formData.priority, formData.dueDate);
            localStorage.setItem(userListKey, JSON.stringify(Array.from(userMap.values()).map(user => user.toData())));
            showSuccess('Task created successfully');
            // alert("Task created successfully!");
        }
        modal.style.display = "none";
        clearModalForm();
        displayTasks(currentUser, user_task_ls);
        // displayTasks(currentUser, currentUser.taskList);
        // addCheckboxListeners();
    }
    catch (error) {
        showFormErrors([error.message], 'task-form');
    }

}

// Delete functionality related code

function initializeDeletion() {
    window.deletionManager = new DeletionManager();

    window.deletionManager.setupTaskCheckboxes();

    // this is for making calling the change event on selecting last task,which was not happening before, basically event listener wasn't getting attached to last task,don't know why.
    document.querySelector("#task-display").addEventListener("change", (event) => {
        if (event.target.classList.contains("task-checkbox")) {
            window.deletionManager.handleCheckboxChange(event);
        }
    });

    // Add event listener to custom event(for our special case.)
    document.addEventListener("deleteTasks", (event) => {
        // Using destructuring to get taskIds
        const { taskIds } = event.detail;
        console.log("Received taskIds in app.js: ", taskIds);

        if (taskIds && taskIds.size > 0) {
            // We can access deleteTask, it will work.
            const deletionSuccessful = currentUser.deleteTask(taskIds);

            if (deletionSuccessful) {

                console.log("Tasks deleted successfully.");
                localStorage.setItem(userListKey, JSON.stringify(Array.from(userMap.values().map(user => user.toData()))));
                let user_task_ls = currentUser["taskList"];
                displayTasks(currentUser, user_task_ls);


                // ✅ Clear selection and hide modal directly
                window.deletionManager.clearSelectionState();
                document.getElementById("delete-modal").style.display = "none";
            }
        }
    });
}

// Basically updating the profile data after showing the profile page.
function updateProfileView(user) {
    const userProfile = document.querySelector("#user-profile");
    const appContainer = userProfile.querySelector(".app-container");
    const contentArea = appContainer.querySelector(".content-area");
    const greetUserContainer = contentArea.querySelector("#greet_user");

    greetUserContainer.innerHTML = '';
    const user_obj = document.createElement("h1");
    user_obj.textContent = `${getGreeting()}, ${user.name}!`;
    greetUserContainer.appendChild(user_obj);
}

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}

function handleBackToHome() {
    pageManager.showPage('home');
    currentUser = null;
    // updateUserDropdown();
    populateUserList();
}

function setupEventListeners() {
    document.getElementById("submitBtn").addEventListener("click", (event) => {
        event.preventDefault();
        const { name, email } = handleFormSubmit();

        if (!name || !email) {
            alert("Please fill out all required fields.");
            return;
        }

        // Checking that user exists or not, if not then we will add one.
        if (!userMap.has(email)) {
            const newUser = new User(name, email);
            userMap.set(email, newUser);
            // 
            userList = Array.from(userMap.values());
            localStorage.setItem(userListKey, JSON.stringify(Array.from(userMap.values()).map(user => user.toData())));

            populateUserList();
            alert("New user added successfully");

            document.getElementById("user-data").reset();
        }
        else {
            alert(`User with email ${email} already exists.`);
            document.getElementById("user-data").reset();
        }
    });

    document.getElementById("back-to-home").addEventListener("click", handleBackToHome);
}

// Initialize the application
function initializeApp() {
    populateUserList();
    setupEventListeners();
    setupModalHandlers();
    setupUserModal();
    notificationCenter();
    initializeDeletion();
    pageManager.showPage('home');
}

initializeApp();

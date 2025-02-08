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
//     displayTask(currentUser);
// }

// // Basically updating the profile data after showing the profile page.
// function updateProfileView(user){
//     const para = document.querySelector("#user-profile p");
//     para.innerHTML = '';
//     const user_obj = document.createElement("h1");
//     user_obj.textContent = `Hi ${user.username}!`;
//     para.appendChild(user_obj);
// }

// function displayTask(user){
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
//             displayTask();
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
import { tagHandler } from "./tagManagement.js";

// Show the global overlay
// export function showGlobalOverlay(){
function showGlobalOverlay(){
    document.querySelector('.global-overlay').style.display = 'block';
}

// Hide the global overlay
// export function hideGlobalOverlay(){
function hideGlobalOverlay(){
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
let deletionManager;
// deletionManager = new DeletionManager();
// deletionManager.setupTaskCheckboxes();

// document.addEventListener('DOMContentLoaded', () => {
//     deletionManager = new DeletionManager();
//     deletionManager.setupTaskCheckboxes();
// });


// For task editing and using it in displayTask function, making this variables global

let isEditMode = false;
let editTaskId = null;
let modal = null;

// Load from local storage and populate the userMap
const storedUsers = JSON.parse(localStorage.getItem(userListKey)) || [];

storedUsers.forEach(userData => {
    const user = User.fromData(userData);
    userMap.set(user.email, user);

    // document.addEventListener('DOMContentLoaded', () => {
    //     displayTask(user);
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
            // func.displayTask(currentUser);
            displayTask(currentUser);
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


export function displayTask(user) {

    const taskDisplay = document.querySelector("#task-display");
    taskDisplay.innerHTML = '<div class="task-container"></div>';
    const cardContainer = taskDisplay.querySelector('.task-container');
    const user_task_ls = user["taskList"];

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

        // ******************************************

        deletionManager = new DeletionManager();
        deletionManager.setupTaskCheckboxes();
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

        taskCard.querySelector('.tag-button').dataset.taskid = task.task_id;
        // Add click handler for editing(i.e. allow to edit only if it is not click at any button like add tag, notify or tags chip itself.)
        taskCard.addEventListener("click", (e) => {

            // If clciked on checkbox or delete icon, don't open modal.
            if (e.target.closest('.task-checkbox') || e.target.closest('.delete-icon')){
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
    // return { displayTask };
}

// console.log("selectedtasks  count is ", selectedTasks.size);
// console.log("selectedTasks are : ", Array.from(selectedTasks));

// Deletion call code starting.
//*** */ I don't think I should add this in app.js (because I am handling everything in my selectionManager.js and data.js file, so don't need feel any need to do this here. but ofcourse i need to call displayTask(user) after deletion.)

// export function handleTaskDeletion(user) {
    
//     // user.deleteTask()
//     localStorage.setItem(currentUser.username, JSON.stringify(user.toData()));
//     displayTask(user);
// }

// *** Deletion call code

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
    //                 displayTask(currentUser);

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
    //         displayTask(currentUser);
    //     }
    //     catch (error) {
    //         showFormErrors([error.message], 'task-form');
    //     }

    // });

    // After closing the task modal, things will again become accessible or enable.
    hideGlobalOverlay();

}

// Form submission handler
function handleTaskSubmit(event) {
    event.preventDefault();
    const formData = handleModalFormData();

    const errors = FormValidator.validateTaskForm(formData);
    if (errors.length > 0) {
        showFormErrors(errors, 'task-form');
        return;
    }
    try {
        if (isEditMode && editTaskId) {
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
                // alert("Task updated successfully!");
                // showSuccess('Task updated successfully');
                displayTask(currentUser);

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
        displayTask(currentUser);
        // addCheckboxListeners();
    }
    catch (error) {
        showFormErrors([error.message], 'task-form');
    }

}

// Basically updating the profile data after showing the profile page.
function updateProfileView(user) {
    const container = document.querySelector("#user-profile div");
    const greet_container = container.querySelector("#greet_user");


    greet_container.innerHTML = '';
    const user_obj = document.createElement("h1");
    user_obj.textContent = `${getGreeting()}, ${user.name}!`;
    greet_container.appendChild(user_obj);
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
    pageManager.showPage('home');
}

initializeApp();

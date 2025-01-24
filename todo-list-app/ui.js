// const element = document.getElementById("submitBtn");
// // Adding an event handler
// element.addEventListener("click", CreateUser);


// For user creation.
export function handleFormSubmit(){
    const user_form = document.getElementById("user-data");
    const name = user_form["name"].value.trim();
    const email = user_form["email"].value.trim();
    
    return {name, email};
}

// export function handleTaskData(){
//     const task_form = document.getElementById("task-creation");
//     const task = task_form["task"].value.trim();
//     const description = task_form["description"].value.trim();
//     const status = task_form["status"].value;
//     console.log("status is", status);
//     const priority = task_form["priority"].value;
//     const dueDate = task_form["dueDate"].value;
//     return {task, description, status, priority, dueDate};
// }

// This is for task creation form using modal.

export function handleModalFormData(){

    const form = document.getElementById("task-form");
    return {
        task:form["task"].value.trim(),
        description: form["modal-description"].value.trim(),
        status:form["modal-status"].value,
        priority:form["modal-priority"].value,
        dueDate:form["modal-dueDate"].value
    };
}

// For update form data
export function populateModalForm(taskData){

    const form = document.getElementById("task-form");
    form["task"].value = taskData.task || '';
    form["modal-description"].value = taskData.description || '';
    form["modal-status"].value = taskData.status || '';
    form["modal-priority"].value = taskData.priority || '';

    // Format date for flatpickr
    if (taskData.dueDate){
        try{
            const date = taskData.dueDate instanceof Date ? taskData.dueDate : new Date(taskData.dueDate);

            // Format date to match flatpickr's expected format.
            const formattedDate = date.toISOString().slice(0,16).replace('T',' ');
            form["modal-dueDate"]._flatpickr.setDate(date);

        }
        catch (error){
            console.error("Error setting date: ", error);
            form["modal=dueDate"].value = '';
        }
        // const date = new Date(taskData.dueDate);
        // const formattedDate = date.toISOString().slice(0,16).replace('T',' ');
        // form["modal-dueDate"].value = formattedDate;
    }
    else{
        form["modal-dueDate"].value = '';
    }
    // form["modal-dueDate"].value = taskData.dueDate || '';
}

export function clearModalForm(){
    const form = document.getElementById("task-form");
    form.reset();
}

export function showFormErrors(errors, formId){
    // Remove any existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());

    if (errors.length > 0){
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container';

        errors.forEach(error => {
            const errorElement = document.createElement('p');
            errorElement.className = 'error-message';
            errorElement.textContent = error;
            errorContainer.appendChild(errorElement);
        });

        const form = document.getElementById(formId);
        form.insertBefore(errorContainer, form.firstChild);

        // Remove error messages after 3 seconds
        setTimeout(() => {
            errorContainer.remove();
        }, 3000);
    }
}

export function showSuccess(message){
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;

    document.body.appendChild(successElement);

    // Remove after 3 seconds
    setTimeout(() => {
        successElement.remove();
    }, 3000);
}

// // Form validation class
// export class FormValidator {
//     static validateTaskForm(formData){
//         const errors = [];

//         if(!formData.task?.trim()){
//             errors.push("Task name is required");
//         }

//         return errors;
//     }
// }
// Just checkin via calling like this.
// document.getElementById("demo").innerHTML = CreateUser();

// Checking code.....

// const element = document.getElementById("submitBtn");
// // Adding an event handler
// element.addEventListener("click", CreateUser);

// function CreateUser(){
//     const user_form = document.getElementById("user-data");
//     const name = user_form["name"].value;
//     const email = user_form["email"].value;
//     const user = new User(name, email);
//     // document.getElementById("demo").innerHTML = "name is " + name + " " + "email is " + email;
//     // Just printing values to check.
//     console.log("name" + name + " " + "email is "+ email);
//     const user_list = [];
//     // Here I want to store a complete user object but want to display them in the list using username over user object, so how to do this?
//     // user_list.push(user.username); // Just trying
//     user_list.push(user);

//     localStorage("user_list", JSON.stringify(user_list));
// }

// // Just checkin via calling like this.
// document.getElementById("demo").innerHTML = CreateUser();
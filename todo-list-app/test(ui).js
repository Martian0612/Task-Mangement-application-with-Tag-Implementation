export function handleFormSubmit(){
    const user_form = document.getElementById("user-data");
    const name = user_form["name"].value.trim();
    const email = user_form["email"].value.trim();
    
    return {name, email};
}

// This is for task creation form using modal.

export function handleModalFormData(){

    const form = document.getElementById("task-form");
    return {
        task:form["task"].value.trim(),
        description: form["modal-description"].value.trim(),
        status:form["modal-status"].value,
        priority:form["modal-priority"].value,
        dueDate:form["modal-dueDate"].value
        // dueDate:selectedDueDate
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
            console.log("formattedDate is ", formattedDate);;
            form["modal-dueDate"]._flatpickr.setDate(formattedDate);

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

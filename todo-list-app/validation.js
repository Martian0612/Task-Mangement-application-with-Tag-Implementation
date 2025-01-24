export class FormValidator {

    static validateTaskForm(formData) {
        const errors = [];

        // taskName = formData["task"];
        // For checking whether a task is a string or not.
        // Type check
        if (typeof formData.task !== 'string') {
            errors.push('Task name must be a text value');
            return errors;
        }

        const trimmedTask = formData.task.trim();

        // Checking if task is a string but an empty one, then raise errors.
        // Empty check
        if (trimmedTask === '') {
            errors.push('Task name cannot be empty');
            return errors;
        }

        // Length check - task name should be meaningful but not too long.
        if (trimmedTask.length < 5 || trimmedTask.length > 200) {
            errors.push('Task name must be between 5 and 200 characters.')
            return errors;
        }

        // Must contain at least one letter (task should have some text)
        if (!/[a-zA-Z]/.test(trimmedTask)) {
            errors.push('Task name must contain at least one letter');
            return errors;
        }


        // Check for just punctuation/special characters
        if (/^[.,!?\s@#$%^&*()-]+$/.test(trimmedTask)) {
            errors.push('Task name cannot consist of only special characters');
            return errors;
        }




        // const validateTaskPattern = /^[a-zA-Z0-9\s.,!?-]+$/;
        // if(!validateTaskPattern.test(trimmedTask)){
        //     errors.push('Task name can only contain letters, numbers, spaces and punctuation');
        //     return errors;
        // }

        // Check for repeated characters (prevents spam)
        if (/(.)\1{4,}/.test(trimmedTask)) {
            errors.push('Task name contains too many repeated characters');
            return errors;
        }

        return errors;
    }
}
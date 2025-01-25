// export function getTagifyOptions(){

// }

// export function tagHandler(user, predefinedTags, tagModal){
//     const input = document.querySelector('input[name="input-custom-dropdown"]');
//     const tagChipsContainer = document.querySelector('.tag-chips-container');

//     function validateTag(tag) {
//         const isEmpty = tag.trim().length === 0;
//         const isTooLong = tag.length > 20;
//         const allowedChars = /^[a-zA-Z0-9.@\-_]+$/;
//         const hasInvalidChars = !allowedChars.test(tag);

//         if (isEmpty){
//             return "Tag cannot be empty.";
//         }
//         else if (isTooLong) {
//             return `Tag cannot be longer than ${20} characters.` ;
//         }
//         else if (hasInvalidChars) {
//             return "Invalid characters found. Allowed characters are alphanumeric, '@', '.', '-', and '_' ";
//         }
//         else{
//             return null;
//         }
//     }

//     const customTags = user.customTags;
//     // Combine predefined and custom tags
//     const whitelistTags = [...predefinedTags, ... customTags];

//     const tags = new Tagify(input, {
//         whitelist: whitelistTags,
//         maxTags: 5,
//         dropdown: {
//             classname : "tag-dropdown",
//             enabled: 1,
//             maxItems : 5,
//             position: "text",
//             closeOnSelect : false,
//             highlightFirst: true,
//             placeAbove : false,
//             clearOnSelect : false,
//             fuzzySearch : false,
//             sortby : "startsWith",
//             backspace : false,
//             keepInvalidTags: true,
//             createInvalidTags: true,
//             placeholder: "Enter tags...",
//             mode: 'mix',
//             enforceWhitelist: true,
//             addTagOn: ["enter"]
//         },
//         validate: (tag) => {
//             const errorMessage = validateTag(tag.value);
//             if (errorMessage) {
//                 tags.setStatus(tag, Tagify.STATUS_INVALID, errorMessage);
//                 return false;
//             }
//             else {
//                 tags.setStatus(tag, Tagify.STATUS_OK);
//                 return true;
//             }
//         },
//         texts: {
//             exceed: "Only 5 tags allowed",
//         }
//     });

//     // Event listener for when a tag is *added to the Tagify input*
//     tags.on('add',(e) => {
//         const tagText = e.detail.data.value;
//         const validationError = validateTag(tagText);

//         if (validationError) {
        
//             tags.statusText(tagText, validationError); // Show error message
            
//             // Remove the invalid tag after a delay (e.g., 3 seconds)
//             setTimeout(() => {
//                 // removeTags is a tagify method, it is use to remove tags from the tagify input field.
//                 tags.removeTags(tagText);
//             }, 3000);    
//             return;
//         }

//         const newTag = {
//             value : uuidv4(),
//             text: tagText
//         };
        
//         // Create the tag chip *in the tag modal*
//         const tagChip = document.createElement('div');
//         tagChip.classList.add('tag-chip');

//         //  A span for tag text.
//         const tagTextElement = document.createElement('span');
//         tagTextElement.textContent = tagText;
//         // I think we need to add tag value here also.
//         // tagText.dataset.tagValue = newTag.value;
//         tagChip.appendChild(tagTextElement);


        
//         // tagChip.textContent = tagText;
//         // tagChip.dataset.tagValue = newTag.value;
//         // tagChipsContainer.appendChild(tagChip);

//         const removeButton = document.createElement('span');
//         removeButton.classList.add('remove-tag');
//         removeButton.textContent = 'x';
//         removeButton.addEventListener('click',() => {
//             // tags.removeTag(tagText); // Remove tag from Tagify , what does it even mean.
//             tagChip.remove(); // Remove the chip from the modal.
//         });
//         tagChip.appendChild(removeButton);

//         tagChip.dataset.tagValue = tagText;
//         tagChipsContainer.appendChild(tagChip);
//     });

//     function updateTaskCardDisplay(task) {
//         const taskCard = document.querySelector(`[data-task-id="${task.task_id}"]`);
//         if (taskCard){
//             const tagsContainer = taskCard.querySelector('.task-tags');
//             if (tagsContainer) {
//                 tagsContainer.innerHTML = ''; // Clear existing tags

//                 task.tagsSet.forEach(tag => {
//                     // Create the tag chip *on the task card*
//                     const tagChip = document.createElement('span');
//                     tagChip.classList.add('task-tag');
//                     tagChip.textContent = tag.text;

//                     const removeButton = document.createElement('span');
//                     removeButton.classList.add('remove-tag');
//                     removeButton.textContent = 'x';

//                     removeButton.addEventListener('click', (event) => {
//                         // Prevent card click event, i.e won't get trigger when user will click anywhere in the task.
//                         event.stopPropagation();
//                         task.tagsSet.delete(tag); // Remove tag from the set.
//                         updateTaskCardDisplay(task);
//                         // Directly saving user object.
//                         localStorage.setItem(currentUser.username, JSON.stringify(user.toData())); 

//                     });
//                     tagChip.appendChild(removeButton);
//                     tagsContainer.appendChild(tagChip);
//                 });
//             }
//         }
//     }

//     const save_tag_btn = document.getElementById('save-tag');
//     save_tag_btn.addEventListener('click',() => {
//         const taskId = tagModal.taskId;
//         const task = user.taskList.find(task => task.task_id === taskId );

//         if (task) {
//             const tagChips = tagChipsContainer.querySelectorAll('.tag-chip');
//             // Temporary array which we are going to use to save in actual tagsSet (maybe).
//             const tagsArray = Array.from(tagChips).map(chip =>{
//                 return {value: chip.dataset.tagValue, text: chip.textContent.slice(0,-1)}
//             });
//             task.tagsSet = new Set(tagsArray);

//             tagsArray.forEach(tag => {
//                 // If tag added by user is not in predefined tags, then add the tag in customTags list or set.
//                 if (!predefinedTags.some(preTag => preTag.text == tag.text)){
//                     user.customTags.add(tag);
//                 }
//             })

//             localStorage.setItem(currentUser.username, JSON.stringify(user.toData()));
//             updateTaskCardDisplay(task);
//             tagModal.style.display = "none";
//             tagChipsContainer.innerHTML = "";
//             tags.removeAllTags();
//             input.value = "";
//         }
//     });
// }

// import Tagify from "@yaireo/tagify"; // Make sure you import Tagify
// import { v4 as uuidv4 } from 'uuid';

// export function getTagifyOptions(user, predefinedTags,) {
//     function validateTag(tag) {
//         const isEmpty = tag.trim().length === 0;
//         const isTooLong = tag.length > 20;
//         const allowedChars = /^[a-zA-Z0-9.@\-_]+$/;
//         const hasInvalidChars = !allowedChars.test(tag);

//         if (isEmpty) {
//             return "Tag cannot be empty.";
//         } else if (isTooLong) {
//             return `Tag cannot be longer than ${20} characters.`;
//         } else if (hasInvalidChars) {
//             return "Invalid characters found. Allowed characters are alphanumeric, '@', '.', '-', and '_' ";
//         } else {
//             return null;
//         }
//     }
//     const customTags = user.customTags;
//     const whitelistTags = [...predefinedTags, ...customTags];

//     return {
//         whitelist: whitelistTags,
//         maxTags: 5,
//         dropdown: {
//             classname: "tag-dropdown",
//             enabled: 1,
//             maxItems: 5,
//             position: "text",
//             closeOnSelect: false,
//             highlightFirst: true,
//             placeAbove: false,
//             clearOnSelect: false,
//             fuzzySearch: false,
//             sortby: "startsWith",
//             backspace: false,
//             keepInvalidTags: true,
//             createInvalidTags: true,
//             placeholder: "Enter tags...",
//             mode: 'mix',
//             enforceWhitelist: true,
//             addTagOn: ["enter"]
//         },
//         validate: (tag) => {
//             const errorMessage = validateTag(tag.value);
//             if (errorMessage) {
//                 tag.tagify.setStatus(tag, Tagify.STATUS_INVALID, errorMessage);
//                 return false;
//             } else {
//                 tag.tagify.setStatus(tag, Tagify.STATUS_OK);
//                 return true;
//             }
//         },
//         texts: {
//             exceed: "Only 5 tags allowed",
//         }
//     };
// }

// export function tagHandler(tagifyInstance, tagChipsContainer, tagModal, user, predefinedTags) {
//     tagifyInstance.on('add', (e) => {
//         const tagText = e.detail.data.value;
//         const validationError = validateTag(tagText); // Use the same validation function

//         if (validationError) {
//             tagifyInstance.statusText(tagText, validationError);
//             setTimeout(() => {
//                 tagifyInstance.removeTags(tagText);
//             }, 3000);
//             return;
//         }

//         const newTag = {
//             value: uuidv4(),
//             text: tagText
//         };

//         const tagChip = document.createElement('div');
//         tagChip.classList.add('tag-chip');

//         const tagTextElement = document.createElement('span');
//         tagTextElement.textContent = tagText;
//         tagChip.appendChild(tagTextElement);

//         const removeButton = document.createElement('span');
//         removeButton.classList.add('remove-tag');
//         removeButton.textContent = 'x';
//         removeButton.addEventListener('click', () => {
//             tagChip.remove();
//         });
//         tagChip.appendChild(removeButton);

//         tagChip.dataset.tagValue = tagText;
//         tagChipsContainer.appendChild(tagChip);
//     });
//     function validateTag(tag) {
//         const isEmpty = tag.trim().length === 0;
//         const isTooLong = tag.length > 20;
//         const allowedChars = /^[a-zA-Z0-9.@\-_]+$/;
//         const hasInvalidChars = !allowedChars.test(tag);

//         if (isEmpty) {
//             return "Tag cannot be empty.";
//         } else if (isTooLong) {
//             return `Tag cannot be longer than ${20} characters.`;
//         } else if (hasInvalidChars) {
//             return "Invalid characters found. Allowed characters are alphanumeric, '@', '.', '-', and '_' ";
//         } else {
//             return null;
//         }
//     }

//     const save_tag_btn = document.getElementById('save-tag');
//     save_tag_btn.addEventListener('click', () => {
//         const taskId = tagModal.taskId;
//         const task = user.taskList.find(task => task.task_id === taskId);

//         if (task) {
//             const tagChips = tagChipsContainer.querySelectorAll('.tag-chip');
//             const tagsArray = Array.from(tagChips).map(chip => {
//                 return { value: chip.dataset.tagValue, text: chip.textContent.slice(0, -1) }
//             });
//             task.tagsSet = new Set(tagsArray);

//             tagsArray.forEach(tag => {
//                 if (!predefinedTags.some(preTag => preTag.text == tag.text)) {
//                     user.customTags.add(tag);
//                 }
//             })

//             localStorage.setItem(currentUser.username, JSON.stringify(user.toData()));
//             updateTaskCardDisplay(task);
//             tagModal.style.display = "none";
//             tagChipsContainer.innerHTML = "";
//             tagifyInstance.removeAllTags(); // Use the passed instance
//             input.value = "";
//         }
//     });
// }


// function validateTag(tag) {
//     const isEmpty = tag.trim().length === 0;
//     const isTooLong = tag.length > 20;
//     const allowedChars = /^[a-zA-Z0-9.@\-_]+$/;
//     const hasInvalidChars = !allowedChars.test(tag);

//     if (isEmpty) {
//         return "Tag cannot be empty.";
//     } else if (isTooLong) {
//         return `Tag cannot be longer than ${20} characters.`;
//     } else if (hasInvalidChars) {
//         return "Invalid characters found. Allowed characters are alphanumeric, '@', '.', '-', and '_' ";
//     } else {
//         return null;
//     }
// }

// export function tagHandler(user, predefinedTags, tagModal) {
//     const input = document.querySelector('input[name="input-custom-dropdown"]');
//     const tagChipsContainer = document.querySelector('.tag-chips-container');

//     const customTags = user.customTags;
//     const whitelistTags = [...predefinedTags, ...customTags];

//     const tags = new Tagify(input, {
//         whitelist: whitelistTags,
//         maxTags: 5,
//         dropdown: {
//             classname: "tag-dropdown",
//             enabled: 1,
//             maxItems: 5,
//             position: "text",
//             closeOnSelect: false,
//             highlightFirst: true,
//             placeAbove: false,
//             clearOnSelect: false,
//             fuzzySearch: false,
//             sortby: "startsWith",
//             backspace: false,
//             keepInvalidTags: true,
//             createInvalidTags: true,
//             placeholder: "Enter tags...",
//             mode: 'mix',
//             enforceWhitelist: true,
//             addTagOn: ["enter"]
//         },
//         texts: {
//             exceed: "Only 5 tags allowed",
//         }
//     });

//     tags.on('add', (e) => {
//         const tagText = e.detail.data.value;
//         const validationError = validateTag(tagText);

//         if (validationError) {
//             tags.DOM.input.classList.add('tagify--invalid');
//             tags.DOM.scope.setAttribute('data-error', validationError);
//             setTimeout(() => {
//                 tags.removeTags(tagText);
//                 tags.DOM.input.classList.remove('tagify--invalid');
//                 tags.DOM.scope.removeAttribute('data-error');
//             }, 3000);
//             return;
//         }

//         const newTag = {
//             value: uuidv4(),
//             text: tagText
//         };

//         const tagChip = document.createElement('div');
//         tagChip.classList.add('tag-chip');

//         const tagTextElement = document.createElement('span');
//         tagTextElement.textContent = tagText;
//         tagChip.appendChild(tagTextElement);

//         const removeButton = document.createElement('span');
//         removeButton.classList.add('remove-tag');
//         removeButton.textContent = 'x';
//         removeButton.addEventListener('click', () => {
//             tagChip.remove();
//         });
//         tagChip.appendChild(removeButton);

//         tagChip.dataset.tagValue = tagText;
//         tagChipsContainer.appendChild(tagChip);
//     });

//     function updateTaskCardDisplay(task) {
//         const taskCard = document.querySelector(`[data-task-id="${task.task_id}"]`);
//         if (taskCard) {
//             const tagsContainer = taskCard.querySelector('.task-tags');
//             if (tagsContainer) {
//                 tagsContainer.innerHTML = '';

//                 task.tagsSet.forEach(tag => {
//                     const tagChip = document.createElement('span');
//                     tagChip.classList.add('task-tag');
//                     tagChip.textContent = tag.text;

//                     const removeButton = document.createElement('span');
//                     removeButton.classList.add('remove-tag');
//                     removeButton.textContent = 'x';

//                     removeButton.addEventListener('click', (event) => {
//                         event.stopPropagation();
//                         task.tagsSet.delete(tag);
//                         updateTaskCardDisplay(task);
//                         localStorage.setItem(currentUser.username, JSON.stringify(user.toData()));
//                     });
//                     tagChip.appendChild(removeButton);
//                     tagsContainer.appendChild(tagChip);
//                 });
//             }
//         }
//     }

//     const save_tag_btn = document.getElementById('save-tag');
//     save_tag_btn.addEventListener('click', () => {
//         const taskId = tagModal.dataset.taskid; // Use dataset here
//         const task = user.taskList.find(task => task.task_id === taskId);

//         if (task) {
//             const tagChips = tagChipsContainer.querySelectorAll('.tag-chip');
//             const tagsArray = Array.from(tagChips).map(chip => {
//                 return { value: chip.dataset.tagValue, text: chip.textContent.slice(0, -1) }
//             });
//             task.tagsSet = new Set(tagsArray);

//             tagsArray.forEach(tag => {
//                 if (!predefinedTags.some(preTag => preTag.text == tag.text)) {
//                     user.customTags.add(tag);
//                 }
//             });

//             localStorage.setItem(currentUser.username, JSON.stringify(user.toData()));
//             updateTaskCardDisplay(task);
//             tagModal.style.display = "none";
//             tagChipsContainer.innerHTML = "";
//             tags.removeAllTags();
//             input.value = "";
//         }
//     });
// }

export function tagHandler(user, predefinedTags, tagModal) {
    const input = document.querySelector('input[name="input-custom-dropdown"]');
    const tagChipsContainer = document.querySelector('.tag-chips-container');

    // Singleton Tagify instance
    let tagsInstance = input.tagify;
    
    // Initialize Tagify only if not already created
    if (!tagsInstance) {
        const customTags = user.customTags;
        const whitelistTags = [...predefinedTags, ...customTags];

        tagsInstance = new Tagify(input, {
            whitelist: whitelistTags,
            maxTags: 5,
            dropdown: {
                classname: "tag-dropdown",
                enabled: 1,
                maxItems: 5,
                enforceWhitelist: true,
                addTagOn: ["enter"]
            },
            validate: (tag) => {
                const errorMessage = validateTag(tag.value);
                if (errorMessage) {
                    // Instead of non-existent setStatus, use built-in methods
                    input.classList.add('tagify--invalid');
                    setTimeout(() => input.classList.remove('tagify--invalid'), 3000);
                    return false;
                }
                return true;
            },
            texts: {
                exceed: "Only 5 tags allowed",
            }
        });

        // Add event listener only once
        tagsInstance.on('add', handleTagAdd);
    }

    function handleTagAdd(e) {
        const tagText = e.detail.data.value;
        const validationError = validateTag(tagText);

        if (validationError) {
            // Remove invalid tag
            tagsInstance.removeTags(tagText);
            return;
        }

        const newTag = {
            value: uuidv4(),
            text: tagText
        };
        
        const tagChip = document.createElement('div');
        tagChip.classList.add('tag-chip');

        const tagTextElement = document.createElement('span');
        tagTextElement.textContent = tagText;
        tagChip.appendChild(tagTextElement);

        const removeButton = document.createElement('span');
        removeButton.classList.add('remove-tag');
        removeButton.textContent = 'x';
        removeButton.addEventListener('click', () => {
            tagChip.remove();
            tagsInstance.removeTags(tagText);
        });
        
        tagChip.appendChild(removeButton);
        tagChip.dataset.tagValue = tagText;
        tagChipsContainer.appendChild(tagChip);
    }

    function validateTag(tag) {
        const isEmpty = tag.trim().length === 0;
        const isTooLong = tag.length > 20;
        const allowedChars = /^[a-zA-Z0-9.@\-_]+$/;
        const hasInvalidChars = !allowedChars.test(tag);

        if (isEmpty) return "Tag cannot be empty.";
        if (isTooLong) return `Tag cannot be longer than 20 characters.`;
        if (hasInvalidChars) return "Invalid characters found.";
        return null;
    }

    // Reset before each use
    tagsInstance.removeAllTags();
    input.value = '';
    tagChipsContainer.innerHTML = '';

    const save_tag_btn = document.getElementById('save-tag');
    save_tag_btn.addEventListener('click', () => {
        const taskId = tagModal.dataset.taskid;
        const task = user.taskList.find(task => task.task_id === taskId);

        if (task) {
            const tagChips = tagChipsContainer.querySelectorAll('.tag-chip');
            const tagsArray = Array.from(tagChips).map(chip => ({
                value: chip.dataset.tagValue, 
                text: chip.textContent.slice(0, -1)
            }));
            
            task.tagsSet = new Set(tagsArray);

            tagsArray.forEach(tag => {
                if (!predefinedTags.some(preTag => preTag.text === tag.text)) {
                    user.customTags.add(tag);
                }
            });

            localStorage.setItem(currentUser.username, JSON.stringify(user.toData()));
            updateTaskCardDisplay(task);
            tagModal.style.display = "none";
            tagChipsContainer.innerHTML = "";
            tagsInstance.removeAllTags();
            input.value = "";
        }
    });

    function updateTaskCardDisplay(task) {
        const taskCard = document.querySelector(`[data-task-id="${task.task_id}"]`);
        if (taskCard) {
            const tagsContainer = taskCard.querySelector('.task-tags');
            if (tagsContainer) {
                tagsContainer.innerHTML = '';
                task.tagsSet.forEach(tag => {
                    const tagChip = document.createElement('span');
                    tagChip.classList.add('task-tag');
                    tagChip.textContent = tag.text;

                    const removeButton = document.createElement('span');
                    removeButton.classList.add('remove-tag');
                    removeButton.textContent = 'x';

                    removeButton.addEventListener('click', (event) => {
                        event.stopPropagation();
                        task.tagsSet.delete(tag);
                        updateTaskCardDisplay(task);
                        localStorage.setItem(currentUser.username, JSON.stringify(user.toData())); 
                    });
                    
                    tagChip.appendChild(removeButton);
                    tagsContainer.appendChild(tagChip);
                });
            }
        }
    }

    return tagsInstance;
}

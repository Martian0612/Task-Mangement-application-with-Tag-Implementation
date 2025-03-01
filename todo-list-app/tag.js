export function tagHandler(user, predefinedTags, tagModal) {
    const input = document.querySelector('input[name="task-tags"]');
    const tagContainer = document.querySelector('#tagify-container');
    const saveTagBtn = document.getElementById('save-tag');

    if (input.tagify) {
        input.tagify.destroy();
    }

    // Clear any lingering tags from previous tasks
    input.value = '';
    tagContainer.innerHTML = '';

    // const customTags = Array.from(user.customTags).map(tag => tag.text);
    const customTags = Array.from(user.customTags).map(tag => tag.text);

    const whitelistTags = [...predefinedTags.map(t => t.text), ...customTags];

    const tagsInstance = new Tagify(input, {
        whitelist: whitelistTags,
        maxTags: 5,
        mode: 'select',
        skipInvalid: true,
        classNames:{
            input: 'tagify__input__outside', // Add 
            scope:'tagify--outside'
        },
        dropdown: {
            classname: "tag-dropdown",
            enabled: 1,
            maxItems: 5,
            position: "text",
            closeOnSelect: false,
            highlightFirst: true,
            placeAbove: false,
            clearOnSelect: false,
            fuzzySearch: false,
            sortby: "startsWith",
            backspace: false,
            keepInvalidTags: true,
            createInvalidTags: false, // Help to not actually create invalid tags.,
            mode: 'mix',
            placeholder: "Enter tags...",
            enforceWhitelist: true,
            addTagOn: ["enter"]
        },


        validation: {
            validate: (tag) => {
                const tagText = typeof tag === 'string' ? tag : (tag.text || tag.value);
                if (!tagText) return "Tag cannot be empty" ;
                // if (!tagText) return "Tag cannot be empty" || false;

                // if (!tagText) return false;

                const trimmedTag = tagText.trim();

                if (trimmedTag.length < 3) {
                    return "Tag must be at least 3 characters long.";
                }

                if (trimmedTag.length > 20) {
                    return "Tag must be 20 characters or less";
                }

                if (!/^[a-zA-Z0-9.@\-_]+$/.test(trimmedTag)) {
                    return "Only alphanumeric characters, ., @, -, _ allowed.";
                }

                return true;
                // This case is redudant, because we are okay, if tag is not in the whitelist, we will add it as a custom tag.
                // if(whitelistTags.includes(trimmedTag)) {return true;}
            }
        },

        callbacks: {
            // add: (e) => {

            add: (e) =>{
                const tagData = e.detail.data;
                if (!tagData.isValid) {
                    e.preventDefault();
                    return;
                }

                // Add tagId if it doesn't exist. (This code  part is redundant because why it will be the case that tagId won't exist, we are creating it while creating tags.)
                if (!tagData.tagId) {
                    tagData.tagId = uuidv4();
                }
                updateTagContainer();
            },
            // Showcasing the error
            invalid: ({ errors }) => {
                if (errors && errors.length > 0) {
                    tagsInstance.settings.errorMessage = errors[0];
                    tagsInstance.DOM.input.classList.add('tagify--invalid');
                    setTimeout(() => {
                        tagsInstance.settings.errorMessage = '';
                        tagsInstance.DOM.input.classList.remove('tagify--invalid');
                    }, 3000);
                }
            }
        },
        texts: { exceed: 'Only 5 tags allowed' }
    });

    // Update tag container on add/remove events
    // tagsInstance.on('add', updateTagContainer);
    // tagsInstance.on('remove', updateTagContainer);

    // Using tagify inbuilt mechanism to create tag chips over doing it manually.
    function updateTagContainer() {
        if (!tagContainer) return; // for safety
        tagContainer.innerHTML = '';

        // What does this line of code means?

        tagsInstance.value.forEach(tagData => {
            const tagElm = document.createElement('span');
            tagElm.className = 'tagify__tag';

        tagElm.innerHTML = ` 
                <span class='tagify__tag-text'>${tagData.value}</span>
                <span class='tagify__tag__removeBtn' role='button' aria-label='remove tag'>&times;</span>
            `;


        tagContainer.appendChild(tagElm);

        const removeButton = tagElm.querySelector('.tagify__tag__removeBtn');
        if (removeButton) {
            removeButton.addEventListener('click',()=>{
                tagsInstance.removeTags(tagData.value);
                updateTagContainer();
            });
        }
    });
    }

    saveTagBtn.addEventListener('click', () => {
        const taskId = tagModal.dataset.taskid;
        const task = user.taskList.find(task => task.task_id === taskId);

        // Storing the tags to the temporary array, and then saving it to tag.

        if (task) {
            // *** want to understand this code, the entire syntax. ***
            const tagsArray = tagsInstance.value.map(tagData => ({
                value: tagData.value,
                isValid: true,
                tagId: tagData.tagId || uuidv4()
            }));

            // Add new custom tags to user's collection
            tagsArray.forEach(tag => {
                if (!whitelistTags.includes(tag.value)){
                    user.customTags.add(tag);
                }
            });

            // Add new custom tags to user's collection
            // tagsArray.forEach(tag => {
            //     // if (!whitelistTags.includes(tag.text)) {
            //     //     user.customTags.add(tag);
            //     // }

            //     if (!whitelistTags.some(wt => wt.value === tag.value)) {
            //         user.customTags.add(tag);
            //     }
            // });

            // Directly converting the tagsArray to tagsSet over iterating it for better efficiency.
            task.tagsSet = new Set(tagsArray);
            localStorage.setItem(user.username, JSON.stringify(user.toData()));
            updateTaskCardTags(task); // Update the task card display

            // Clear the Tagify input and tag chips in the modal - old version
            // tagsInstance.removeAllTags(); // Clear Tagify's state
            // updateTagContainer(); // Clear the displayed chips
            // input.value = ''; // Clear the input field

            // New version, clear the tagify input 
            tagsInstance.removeAllTags();
            input.value = '';
            tagContainer.innerHTML = '';


            tagModal.style.display = 'none';
        }
    });
    return tagsInstance;
}

// updateTaskCardTags() code is related to which part of flow or tag implementation.
function updateTaskCardTags(task) {
    const taskCard = document.querySelector(`[data-task-id="${task.task_id}"]`);
    console("task id is , inside udpateTaskCardFun ", task.task_id)

    // This condition is redundant because tags can only be added via cards not from anywhere else.
    if (!taskCard) return;

    // Redundant code
    const tagsContainer = taskCard.querySelector('.tags-container');

    // Redundant code
    if (!tagsContainer) return;

    tagsContainer.innerHTML = '';

    task.tagsSet.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'task-tag tagify__tag'; // Add Tagify class for consistent styling
        tagElement.textContent = tag.value;
        tagElement.dataset.tagId = tag.tagId;
        tagsContainer.appendChild(tagElement);
    });

}

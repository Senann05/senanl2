
document.addEventListener('DOMContentLoaded', () => {

    function ToDoList(addButtonSelector, olSelector, inputContainerSelector, inputFieldSelector, iconContainers) {
        const addButton = document.querySelector(addButtonSelector);
        const olElement = document.querySelector(olSelector);
        const inputContainer = document.querySelector(inputContainerSelector);
        const inputField = document.querySelector(inputFieldSelector);
        
        let isInputVisible = true;
        let isAscending = true;

        olElement.style.display = 'none';
        inputContainer.style.display = 'flex';

        addButton.addEventListener('click', () => handleAddButtonClick());

        for (let i = 0; i < iconContainers.length; i++) {
            const { visible, hidden } = iconContainers[i];

            visible.style.display = 'block';
            hidden.style.display = 'none';

            visible.addEventListener('click', () => toggleSortOrder(visible, hidden));
            hidden.addEventListener('click', () => toggleSortOrder(hidden, visible));
        }

        function handleAddButtonClick() {
            const inputValue = inputField.value;

            if (!isInputVisible) {
                showInputContainer();
                return;
            }

            if (inputValue.length > 0) {
                addListItem(inputValue);
                inputField.value = ''; 
                olElement.style.display = 'block';
                inputContainer.style.display = 'none'; 
                isInputVisible = false; 
            } else {
                alert('Boş mesaj göndermek olmaz!'); 
            }
        }

        function addListItem(text) {
            const newListItem = document.createElement('li');
            newListItem.classList.add('colorchange');

            const deleteIcon = document.createElement('img');
            deleteIcon.classList.add('xblock');
            deleteIcon.src = 'imgs/Group 77 (1).svg';
            deleteIcon.alt = 'x';
            
            const deleteIconHover = document.createElement('img');
            deleteIconHover.classList.add('xhoverblock');
            deleteIconHover.src = 'imgs/Group 70.svg';
            deleteIconHover.alt = 'xpurple';

            deleteIcon.addEventListener('click', () => removeListItem(newListItem));
            deleteIconHover.addEventListener('click', () => removeListItem(newListItem));

            newListItem.textContent = text;
            newListItem.appendChild(deleteIcon); 
            newListItem.appendChild(deleteIconHover); 
            olElement.appendChild(newListItem); 
        }

        function removeListItem(listItem) {
            listItem.remove(); 
            if (olElement.children.length === 0) {
                olElement.style.display = 'none';
                showInputContainer();
            }
        }

        function showInputContainer() {
            olElement.style.display = 'none';
            inputContainer.style.display = 'flex';
            isInputVisible = true; 
        }

        function toggleSortOrder(visible, hidden) {
            visible.style.display = 'none';
            hidden.style.display = 'block';
            
            isAscending = !isAscending;
            sortListItems();
        }

        function sortListItems() {
            const itemsArray = Array.from(olElement.querySelectorAll('li'));
            itemsArray.sort((a, b) => {
                const textA = a.textContent.trim();
                const textB = b.textContent.trim();
                return isAscending ? textA.localeCompare(textB) : textB.localeCompare(textA);
            });
            
            olElement.innerHTML = '';
            itemsArray.forEach(item => olElement.appendChild(item));
        }
    }

    const containers = [
        { visible: document.querySelector('.icon-container'), hidden: document.querySelector('.icon-container2') }
    ];

    ToDoList('.add-button', '#ol', '.input-container', '.input-container input', containers);
});

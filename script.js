// const addButton = document.querySelector('.add-button');
// const olElement = document.getElementById('ol');
// const inputContainer = document.querySelector('.input-container');
// const inputField = inputContainer.querySelector('input');

// olElement.style.display = 'none';
// inputContainer.style.display = 'flex';
// let clickCount = 0;

// addButton.addEventListener('click', () => {
//     if (inputContainer.style.display === 'none') {
//         return; 
//     }

//     const inputValue = inputField.value;
//     if (inputValue.length === 0) {
//         alert('bos mesaj gonermek olmaz! Agilli ol!');
//         return; 
//     }})

// addButton.addEventListener('click', () => {
//     clickCount += 1;

//     if (clickCount === 1) {
//         const inputValue = inputField.value.trim();

//         if (inputValue) {
//             const newListItem = document.createElement('li');
//             newListItem.classList.add('colorchange');
//             newListItem.innerHTML = `${inputValue} <img class="xblock" src="imgs/Group 77 (1).svg" alt="x"> <img class="xhoverblock" src="imgs/Group 70.svg" alt="xpurple">`;

//             olElement.appendChild(newListItem);

//             inputField.value = '';
//         }

//         olElement.style.display = 'block';
//         inputContainer.style.display = 'none';
//     } else {
//         olElement.style.display = 'none';
//         inputContainer.style.display = 'flex';
//         clickCount = 0; 
//     }
// });








class ToDoList {
    constructor(addButtonSelector, olSelector, inputContainerSelector, inputFieldSelector) {
        this.addButton = document.querySelector(addButtonSelector);
        this.olElement = document.querySelector(olSelector);
        this.inputContainer = document.querySelector(inputContainerSelector);
        this.inputField = document.querySelector(inputFieldSelector);
        
        this.isInputVisible = true; 
        this.olElement.style.display = 'none';
        this.inputContainer.style.display = 'flex'; 

        this.addButton.addEventListener('click', () => this.handleAddButtonClick());
    }

    handleAddButtonClick() {
        const inputValue = this.inputField.value.trim();

        if (!this.isInputVisible) {
            this.showInputContainer();
            return;
        }

        if (inputValue.length > 0) {
            this.addListItem(inputValue);
            this.inputField.value = ''; 
            this.olElement.style.display = 'block';
            this.inputContainer.style.display = 'none'; 
            this.isInputVisible = false; 
        } else {
            alert('Bos mesaj gondermek olmaz! Agilli ol!'); 
        }
    }

    addListItem(text) {
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


        deleteIcon.addEventListener('click', () => this.removeListItem(newListItem));
        deleteIconHover.addEventListener('click', () => this.removeListItem(newListItem));

        newListItem.innerHTML = `${text} `;
        newListItem.appendChild(deleteIcon); 
        newListItem.appendChild(deleteIconHover); 
        this.olElement.appendChild(newListItem); 
    }

    removeListItem(listItem) {
        listItem.remove(); 
        if (this.olElement.children.length === 0) {
            this.olElement.style.display = 'none';
            this.showInputContainer();
        }
    }

    showInputContainer() {
        this.olElement.style.display = 'none';
        this.inputContainer.style.display = 'flex';
        this.isInputVisible = true; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ToDoList('.add-button', '#ol', '.input-container', '.input-container input');
});










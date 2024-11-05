class TaskManager {
    constructor(config) {
        const {
            addButtonSelector,
            listSelector,
            inputContainerSelector,
            textInputSelector,
            toggleButtons
        } = config;

        this.addButton = document.querySelector(addButtonSelector);
        this.taskList = document.querySelector(listSelector);
        this.inputContainer = document.querySelector(inputContainerSelector);
        this.textInput = document.querySelector(textInputSelector);

        this.inputVisible = true;
        this.ascendingOrder = true;

        this.initUI();
        this.addEventListeners(toggleButtons);
    }

    initUI() {
        this.taskList.style.display = 'none';
        this.inputContainer.style.display = 'flex';
    }

    addEventListeners(toggleButtons) {
        this.addButton.addEventListener('click', () => this.addTaskHandler());

        toggleButtons.forEach(({ show, hide }) => {
            this.toggleButtonDisplay(show, hide);
            show.addEventListener('click', () => this.changeSortOrder(show, hide));
            hide.addEventListener('click', () => this.changeSortOrder(hide, show));
        });

        const clearInputIcon = document.querySelector('.xhover');
        clearInputIcon.addEventListener('click', this.clearInput.bind(this));
    }

    toggleButtonDisplay(show, hide) {
        show.style.display = 'block';
        hide.style.display = 'none';
    }

    addTaskHandler() {
        const task = this.textInput.value.trim();

        if (!this.inputVisible) {
            this.showInputArea();
            return;
        }

        if (task) {
            this.createTask(task);
            this.textInput.value = '';
            this.taskList.style.display = 'block';
            this.inputContainer.style.display = 'none';
            this.inputVisible = false;
        } else {
            alert('Boş görev eklenemez!');
        }
    }

    createTask(content) {
        const listItem = document.createElement('li');
        listItem.classList.add('colorchange');
        listItem.textContent = content;
        listItem.setAttribute('draggable', true);

        listItem.addEventListener('dragstart', (e) => this.onDragStart(e, listItem));
        listItem.addEventListener('dragover', (e) => this.onDragOver(e));
        listItem.addEventListener('drop', (e) => this.onDrop(e, listItem));

        listItem.addEventListener('dblclick', () => this.enableEdit(listItem));

        const deleteButton = this.createIcon('x', 'imgs/Group 77 (1).svg', () => this.deleteTask(listItem));
        const deleteHoverButton = this.createIcon('xhover', 'imgs/Group 70.svg', () => this.deleteTask(listItem));
        const editButton = this.createIcon('edit', 'imgs/Daco_5027936.png', () => this.deleteTask(listItem));

        deleteButton.addEventListener('mouseover', () => {
            deleteButton.style.display = 'none';
            deleteHoverButton.style.display = 'inline';
        });
        deleteHoverButton.addEventListener('mouseout', () => {
            deleteHoverButton.style.display = 'none';
            deleteButton.style.display = 'inline';
        });

        listItem.append(deleteButton, deleteHoverButton);
        this.taskList.appendChild(listItem);
    }

    createIcon(className, src, onClick) {
        const icon = document.createElement('img');
        icon.classList.add(className);
        icon.src = src;
        icon.alt = className;
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', onClick);
        return icon;
    }

    enableEdit(listItem) {
        const currentText = listItem.textContent;
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = currentText;
        inputField.classList.add('edit-input');
        listItem.textContent = '';
        listItem.appendChild(inputField);
        inputField.focus();

        const completeEditing = () => {
            listItem.textContent = inputField.value.trim() || currentText;
            this.attachIcons(listItem);
        };

        inputField.addEventListener('blur', completeEditing);
        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                completeEditing();
            }
        });
    }

    attachIcons(listItem) {
        const deleteButton = this.createIcon('x', 'imgs/Group 77 (1).svg', () => this.deleteTask(listItem));
        const deleteHoverButton = this.createIcon('xhover', 'imgs/Group 70.svg', () => this.deleteTask(listItem));
        const editButton = this.createIcon('edit', 'imgs/Daco_5027936.png', () => this.deleteTask(listItem));

        deleteButton.addEventListener('mouseover', () => {
            deleteButton.style.display = 'none';
            deleteHoverButton.style.display = 'inline';
        });
        deleteHoverButton.addEventListener('mouseout', () => {
            deleteHoverButton.style.display = 'none';
            deleteButton.style.display = 'inline';
        });

        listItem.append(deleteButton, deleteHoverButton);
    }

    onDragStart(e, listItem) {
        e.dataTransfer.setData('text/plain', listItem.textContent);
        this.draggedTask = listItem;
        setTimeout(() => listItem.classList.add('hidden'), 0);
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e, targetItem) {
        e.preventDefault();
        if (this.draggedTask !== targetItem) {
            const parentNode = targetItem.parentNode;
            parentNode.insertBefore(this.draggedTask, targetItem);
        }
        this.draggedTask.classList.remove('hidden');
        this.draggedTask = null;
    }

    deleteTask(listItem) {
        listItem.remove();
        if (!this.taskList.children.length) {
            this.taskList.style.display = 'none';
            this.showInputArea();
        }
    }

    clearInput() {
        this.textInput.value = '';
    }

    showInputArea() {
        this.taskList.style.display = 'none';
        this.inputContainer.style.display = 'flex';
        this.inputVisible = true;
    }

    changeSortOrder(show, hide) {
        [show.style.display, hide.style.display] = [hide.style.display, show.style.display];
        this.ascendingOrder = !this.ascendingOrder;
        this.organizeTasks();
    }

    organizeTasks() {
        const items = Array.from(this.taskList.children);
        items.sort((a, b) => {
            const numA = parseInt(a.textContent, 10);
            const numB = parseInt(b.textContent, 10);

            if (isNaN(numA) || isNaN(numB)) {
                return this.ascendingOrder 
                    ? a.textContent.localeCompare(b.textContent)
                    : b.textContent.localeCompare(a.textContent);
            }

            return this.ascendingOrder ? numA - numB : numB - numA;
        });

        this.taskList.innerHTML = '';
        items.forEach(item => this.taskList.appendChild(item));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TaskManager({
        addButtonSelector: '.add-button',
        listSelector: '#ol',
        inputContainerSelector: '.input-container',
        textInputSelector: '.input-container input',
        toggleButtons: [
            { show: document.querySelector('.icon-container'), hide: document.querySelector('.icon-container2') }
        ]
    });
});

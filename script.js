class ToDoList {
    constructor(elements) {
        const {
            addTaskBtnSelector,
            taskListSelector,
            inputWrapperSelector,
            taskInputSelector,
            toggleIcons
        } = elements;

        this.addTaskBtn = document.querySelector(addTaskBtnSelector);
        this.taskList = document.querySelector(taskListSelector);
        this.inputWrapper = document.querySelector(inputWrapperSelector);
        this.taskInput = document.querySelector(taskInputSelector);

        this.isInputVisible = true;
        this.isAscending = true;

        this.initializeUI();
        this.setupEventListeners(toggleIcons);
    }

    initializeUI() {
        this.taskList.style.display = 'none';
        this.inputWrapper.style.display = 'flex';
    }

    setupEventListeners(toggleIcons) {
        this.addTaskBtn.addEventListener('click', () => this.handleAddButtonClick());

        toggleIcons.forEach(({ visible, hidden }) => {
            this.setToggleIconVisibility(visible, hidden);
            visible.addEventListener('click', () => this.toggleSortOrder(visible, hidden));
            hidden.addEventListener('click', () => this.toggleSortOrder(hidden, visible));
        });

        const clearInputIcon = document.querySelector('.xhover');
        clearInputIcon.addEventListener('click', this.clearInputField.bind(this));
    }

    setToggleIconVisibility(visible, hidden) {
        visible.style.display = 'block';
        hidden.style.display = 'none';
    }

    handleAddButtonClick() {
        const inputValue = this.taskInput.value.trim();

        if (!this.isInputVisible) {
            this.showInputContainer();
            return;
        }

        if (inputValue) {
            this.addListItem(inputValue);
            this.taskInput.value = '';
            this.taskList.style.display = 'block';
            this.inputWrapper.style.display = 'none';
            this.isInputVisible = false;
        } else {
            alert('Boş mesaj göndermek olmaz!');
        }
    }

    addListItem(text) {
        const listItem = document.createElement('li');
        listItem.classList.add('colorchange');
        listItem.textContent = text;
        listItem.setAttribute('draggable', true);

        listItem.addEventListener('dragstart', (e) => this.handleDragStart(e, listItem));
        listItem.addEventListener('dragover', (e) => this.handleDragOver(e));
        listItem.addEventListener('drop', (e) => this.handleDrop(e, listItem));

        // Çift tıklama ile düzenleme
        listItem.addEventListener('dblclick', () => this.editListItem(listItem));

        const deleteIcon = this.createIcon('x', 'imgs/Group 77 (1).svg', () => this.removeListItem(listItem));
        const deleteIconHover = this.createIcon('xhover', 'imgs/Group 70.svg', () => this.removeListItem(listItem));
        const editIcon = this.createIcon('edit', 'imgs/Daco_5027936.png', () => this.removeListItem(listItem));

        deleteIcon.addEventListener('mouseover', () => {
            deleteIcon.style.display = 'none';
            deleteIconHover.style.display = 'inline';
        });
        deleteIconHover.addEventListener('mouseout', () => {
            deleteIconHover.style.display = 'none';
            deleteIcon.style.display = 'inline';
        });

        listItem.append(deleteIcon, deleteIconHover);
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

    editListItem(listItem) {
        const currentText = listItem.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.classList.add('edit-input');
        listItem.textContent = '';
        listItem.appendChild(input);
        input.focus();

        const finishEditing = () => {
            listItem.textContent = input.value.trim() || currentText;
            this.addIcons(listItem); // Düzenlenen metne ikonları geri ekler
        };

        input.addEventListener('blur', finishEditing);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                finishEditing();
            }
        });
    }

    addIcons(listItem) {
        const deleteIcon = this.createIcon('x', 'imgs/Group 77 (1).svg', () => this.removeListItem(listItem));
        const deleteIconHover = this.createIcon('xhover', 'imgs/Group 70.svg', () => this.removeListItem(listItem));
        const editIcon = this.createIcon('edit', 'imgs/Daco_5027936.png', () => this.removeListItem(listItem));

        deleteIcon.addEventListener('mouseover', () => {
            deleteIcon.style.display = 'none';
            deleteIconHover.style.display = 'inline';
        });
        deleteIconHover.addEventListener('mouseout', () => {
            deleteIconHover.style.display = 'none';
            deleteIcon.style.display = 'inline';
        });

        listItem.append(deleteIcon, deleteIconHover);
    }

    handleDragStart(e, listItem) {
        e.dataTransfer.setData('text/plain', listItem.textContent);
        this.draggedItem = listItem;
        setTimeout(() => listItem.classList.add('hidden'), 0);
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDrop(e, targetItem) {
        e.preventDefault();
        if (this.draggedItem !== targetItem) {
            const parent = targetItem.parentNode;
            parent.insertBefore(this.draggedItem, targetItem);
        }
        this.draggedItem.classList.remove('hidden');
        this.draggedItem = null;
    }

    removeListItem(listItem) {
        listItem.remove();
        if (!this.taskList.children.length) {
            this.taskList.style.display = 'none';
            this.showInputContainer();
        }
    }

    clearInputField() {
        this.taskInput.value = '';
    }

    showInputContainer() {
        this.taskList.style.display = 'none';
        this.inputWrapper.style.display = 'flex';
        this.isInputVisible = true;
    }

    toggleSortOrder(visible, hidden) {
        [visible.style.display, hidden.style.display] = [hidden.style.display, visible.style.display];
        this.isAscending = !this.isAscending;
        this.sortListItems();
    }

    sortListItems() {
        const items = Array.from(this.taskList.children);
        items.sort((a, b) => this.isAscending
            ? a.textContent.localeCompare(b.textContent)
            : b.textContent.localeCompare(a.textContent)
        );

        this.taskList.innerHTML = '';
        items.forEach(item => this.taskList.appendChild(item));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ToDoList({
        addTaskBtnSelector: '.add-button',
        taskListSelector: '#ol',
        inputWrapperSelector: '.input-container',
        taskInputSelector: '.input-container input',
        toggleIcons: [
            { visible: document.querySelector('.icon-container'), hidden: document.querySelector('.icon-container2') }
        ]
    });
});

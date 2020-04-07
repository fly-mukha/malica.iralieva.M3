class Application {
    constructor() {
        // обработчик нажатия кнопки "добавить"
        this.addButton = document.querySelector('#add-button');
        this.addButton.addEventListener('click', this.addNote);

        // Обработчик нажатия кнопки "сортировка"
        this.sortButton = document.querySelector('.sort-button');
        this.sortButton.addEventListener('click', this.sort);

        // контейнер списка задач
        this.container = document.querySelector('#container');
        this.addNote();
    }

    addNote = () => {
        // Создаём и добавляем записку
        const newNote = document.createElement('div');
        newNote.classList.add('to-do-note');
        container.append(newNote);

        //Создаём кнопку перетаскивания
        const dragAndDropButton = document.createElement('button');
        dragAndDropButton.classList.add('drag-n-drop-button');
        dragAndDropButton.addEventListener('mousedown', this.dragAndDrop);
        newNote.append(dragAndDropButton);

        // Создаём поле ввода
        const inputElevent = document.createElement('input');
        newNote.append(inputElevent);

        // Создаём кнопку удаления и объявляем обработчик события
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = "✕";
        deleteButton.addEventListener('click', this.delete);
        newNote.append(deleteButton);
    }

    sort = () => {
        // Меняем внешний вид
        this.sortButton.classList.remove('sort-button');
        this.sortButton.classList.add('reverse-sort-button');

        //сортируем содержимое
        const inputElements = document.querySelectorAll('input');
        const valuesToSort = [];
        inputElements.forEach((item) => {
            valuesToSort.push(item.value);
        });

        valuesToSort.sort();

        //показываем содержимое
        for (let i = 0; i < inputElements.length; i++) {
            inputElements[i].value = valuesToSort[i];
        }

        //меняем обработчик события
        this.sortButton.removeEventListener('click', this.sort);
        this.sortButton.addEventListener('click', this.reverseSort);
    }

    reverseSort = () => {
        this.sortButton.classList.remove('reverse-sort-button');
        this.sortButton.classList.add('sort-button');

        //сортируем содержимое
        const inputElements = document.querySelectorAll('input');
        const valuesToSort = [];
        inputElements.forEach((item) => {
            valuesToSort.push(item.value);
        });

        valuesToSort.sort();
        valuesToSort.reverse();

        //показываем содержимое
        for (let i = 0; i < inputElements.length; i++) {
            inputElements[i].value = valuesToSort[i];
        }

        //меняем обработчик события
        this.sortButton.removeEventListener('click', this.reverseSort);
        this.sortButton.addEventListener('click', this.sort);
    }

    delete() {
        const note = this.parentElement;
        note.remove();
    }

    dragAndDrop(e) {
        function handleMouseMove(e) {
            const containerRect = container.getBoundingClientRect();
            note.style.left = (e.pageX - containerRect.left - 10) + 'px';
            note.style.top = (e.pageY - containerRect.top - 10) + 'px';
        }

        const handleMouseUp = (e) => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        
            const noteElements = document.querySelectorAll('.to-do-note');

            const noteElementsArray = [];
            noteElements.forEach((item) => {
                noteElementsArray.push(item);
            });

            noteElementsArray.sort((a, b) => {
                const firstRect = a.getBoundingClientRect();
                console.log('a', a, firstRect);
                const secondRect = b.getBoundingClientRect();
                console.log('b', b, secondRect);
                return firstRect.y > secondRect.y ? 1 : -1;
            });
            
            note.classList.remove('dragging');
            note.style = null;
            const container = document.querySelector('#container');
            container.innerHTML = '';

            noteElementsArray.forEach((item) => {
                container.append(item);
            })
        }

        const note = this.parentElement;
        note.classList.add('dragging');

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
}

const app = new Application();

const elementsForEditing =  [
    {
        tag: 'p',
        properties: ['color', 'font-size', 'line-height', 'text-align', 'margin', 'padding', 'background-color']
    },
    {
        tag: 'a',
        properties: ['color', 'text-decoration', 'font-weight', 'font-size', 'padding']
    },
    {
        tag: 'li',
        properties: ['list-style-type', 'margin', 'padding', 'color', 'font-size']
    },
    {
        tag: 'div',
        properties: ['width', 'height', 'background-color', 'padding', 'margin', 'border']
    },
    {
        tag: 'section',
        properties: ['padding', 'margin', 'background-color', 'border']
    },
    {
        tag: 'span',
        properties: ['color', 'font-size', 'font-weight', 'background-color']
    },
    {
        tag: 'h1',
        properties: ['font-size', 'color', 'margin', 'text-align']
    },
    {
        tag: 'h2',
        properties: ['font-size', 'color', 'margin', 'text-align']
    },
    {
        tag: 'ul',
        properties: ['list-style-type', 'padding', 'margin', 'color']
    },
    {
        tag: 'ol',
        properties: ['list-style-type', 'padding', 'margin', 'color']
    },
    {
        tag: 'img',
        properties: ['width', 'height', 'border-radius', 'margin', 'padding']
    },
    {
        tag: 'table',
        properties: ['border', 'width', 'border-collapse', 'margin', 'padding']
    },
    {
        tag: 'button',
        properties: ['background-color', 'color', 'border', 'padding', 'font-size', 'border-radius']
    },
    {
        tag: 'input',
        properties: ['width', 'height', 'border', 'padding', 'margin', 'font-size']
    },
    {
        tag: 'form',
        properties: ['padding', 'margin', 'background-color', 'border']
    }
];
let elementsList = [];// В цю змінну запишемо всі знайдені на сторінці елементи
// Стилі:
// Стилі для панелі
const panelStyles = {
    position: "fixed",
    zIndex: "1000",
    bottom: "20px",
    right: "20px",
    height: "120px",
    width: "120px",
    backgroundColor: "black",
    color: "white",
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '6px',
    overflowY: 'auto', // Додаємо скролінг для довгого вмісту
    borderRadius: '4px', // Додаємо згладжені кути
};
// Стилі для кнопок
const buttonStyles = {
    padding: '4px 6px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    outline: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
};
const buttonResetStyles = {
    padding: '4px 6px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    outline: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    display: 'none'
}
// Стилі для select
const selectStyles = {
    border: 'none',
    outline: 'none',
    padding: '4px 6px',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '14px',
    borderRadius: '3px',
    width: '100%',
    display: 'none'
};
// Стилі для інпутів (поля для властивостей)
const inputStyles = {
    width: '100%',
    padding: '4px 6px',
    border: 'none',
    outline: 'none',
    borderRadius: '3px',
    boxSizing: 'border-box',
};
// Стилі для панелі властивостей
const propertyPanelStyles = {
    display: 'none',
    flexDirection: 'column',
    gap: '5px',
};
// Стилі для контейнера кожної властивості
const propertyContainerStyles = {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1fr', // Дві колонки для міток/інпутів і одна для кнопки
    gap: '10px', // Відстань між елементами
    alignItems: 'center', // Вертикальне вирівнювання елементів
};
// Функції:
// Ця функція виконується після завантаження вікна/сторінки
window.onload = () => {
    elementsList = findElements(); // Шукаємо всі елементи
    createPanel(); // Створюємо панель
    // console.log(elementsList); - можна вивести в консоль подивитись.
}

// Функція для пошуку всіх елементів зі списку elementsForEditing через querySelectorAll
const findElements = () => {
    elementsForEditing.forEach(tagObj => {
        // Використовуємо querySelectorAll для пошуку елементів по тегу
        const foundElements = document.querySelectorAll(tagObj.tag);
        // Додаємо знайдені елементи в elementsList
        elementsList.push(...foundElements);
        // Для перевірки можемо вивести кількість знайдених елементів для кожного тегу
        console.log(`Знайдено ${foundElements.length} елемент(ів) для тега <${tagObj.tag}>`);
    });

    return elementsList; // Повертаємо масив знайдених елементів
};

// Функція для створення панелі:
const createPanel = () => {
    // Шукаємо тег BODY,
    const elementBody = document.body; // Отримуємо елемент body
    if (!elementBody) return; // Перевіряємо, чи існує body

    const panel = document.createElement('div'); // Створюємо новий елемент div
    panel.dataset.panelState = 'false'; // Використовуємо dataset для встановлення стану
    panel.classList.add('panel'); // Додаємо клас "panel"
    Object.assign(panel.style, panelStyles); // додаємо стилі до панелі

    const button = document.createElement('button'); // Створюємо кнопку
    button.id = 'panelButton'; // Додаємо id
    Object.assign(button.style, buttonStyles); // Додаємо стилі до кнопки
    button.innerHTML = "Показати"; // Текст кнопки
    button.addEventListener('click', changePanel); // Додаємо обробник події

    panel.appendChild(button); // Додаємо кнопку до панелі
    panel.id = "panel"; // Додаємо id для панелі
    elementBody.prepend(panel); // Додаємо панель до body
    showList(); // Показуємо список елементів
}

const showList = () => {
    const panel = document.getElementById('panel'); // Отримуємо панель
    if (!panel) return; // Перевірка існування панелі

    const select = document.createElement('select'); // Створюємо елемент select
    Object.assign(select.style, selectStyles); // Додаємо стилі до select
    select.id = 'panelSelect'; // Додаємо id для select

    const propertiesPanel = document.createElement('div'); // Панель для зміни властивостей
    propertiesPanel.id = 'propertiesPanel'; // Додаємо id для панелі властивостей
    Object.assign(propertiesPanel.style, propertyPanelStyles);

    // Слідкуємо за діями з елементом select
    select.addEventListener('change', event => {
        const selectedIndex = event.target.value; // Отримуємо індекс вибраного елемента
        propertiesPanel.innerHTML = ''; // Очищуємо панель властивостей для нового елемента

        // Очищуємо outline для всіх елементів у списку
        elementsList.forEach(el => {
            el.style.outline = 'none';
        });

        // Отримуємо вибраний елемент за індексом
        const selectedElement = elementsList[selectedIndex];
        if (selectedElement) {
            selectedElement.style.outline = '4px solid red'; // виділяємо вибраний елемент

            // Додаємо динамічні поля для редагування властивостей
            const tagObj = elementsForEditing.find(obj => obj.tag === selectedElement.tagName.toLowerCase());
            if (tagObj) {
                tagObj.properties.forEach(property => {
                    const currentProperty = window.getComputedStyle(selectedElement)[property]; // Отримуємо поточне значення властивості

                    // Створюємо поле для введення нового значення властивості
                    const propertyLabel = document.createElement('label');
                    propertyLabel.textContent = `${property}: `;

                    const propertyInput = document.createElement('input');
                    Object.assign(propertyInput.style, inputStyles);
                    propertyInput.value = currentProperty; // Встановлюємо поточне значення

                    const applyButton = document.createElement('button');
                    Object.assign(applyButton.style, buttonStyles);
                    applyButton.textContent = 'Застосувати';

                    // Обробник для кнопки застосування
                    applyButton.addEventListener('click', () => {
                        selectedElement.style[property] = propertyInput.value; // Застосовуємо нове значення CSS властивості
                    });

                    // Додаємо елементи до панелі властивостей
                    const propertyContainer = document.createElement('div');
                    Object.assign(propertyContainer.style,propertyContainerStyles);
                    propertyContainer.appendChild(propertyLabel);
                    propertyContainer.appendChild(propertyInput);
                    propertyContainer.appendChild(applyButton);

                    propertiesPanel.appendChild(propertyContainer); // Додаємо контейнер до панелі
                });
            }
        }
    });

    const resetButton = document.createElement('button'); // Створюємо кнопку Очистити
    resetButton.textContent = 'Очистити'; // Встановлюємо текст кнопки
    resetButton.id = 'resetButton';
    Object.assign(resetButton.style, buttonResetStyles); // Додаємо стилі до кнопки

    resetButton.addEventListener('click', () => { // Додаємо обробник кліку
        elementsList.forEach(el => {
            el.style.outline = 'none'; // Очищаємо outline для всіх елементів
        });
        select.value = ''; // Скидаємо вибір у select
        propertiesPanel.innerHTML = ''; // Очищаємо панель властивостей
    });

    panel.appendChild(select); // Додаємо select до панелі
    panel.appendChild(resetButton); // Додаємо кнопку для скидання до панелі
    panel.appendChild(propertiesPanel); // Додаємо панель властивостей

    elementsList.forEach((tag, index) => { // Ітеруємо знайдені елементи з індексом
        const option = document.createElement('option'); // Створюємо опцію для select
        option.value = index.toString(); // Встановлюємо індекс як значення
        let textContent = tag.textContent.trim(); // Отримуємо текстовий контент
        let optionText = textContent.length > 20 ? textContent.substring(0, 20) + " ..." : textContent; // Обрізаємо текст
        option.innerHTML = `${tag.tagName.toLowerCase()} ${optionText}`; // Встановлюємо текст опції
        select.appendChild(option); // Додаємо опцію до select
    });
};

// Функція для зміни розміру панелі
const changePanel = () => {
    const panel = document.getElementById('panel'); // Отримуємо панель
    if (!panel) return; // Перевірка існування панелі

    const panelState = panel.dataset.panelState === 'true'; // Поточний стан панелі
    panel.style.height = panelState ? "120px" : "600px"; // Встановлюємо новий розмір
    panel.style.width = panelState ? "120px" : "600px";

    const button = document.getElementById('panelButton'); // Отримуємо кнопку
    if (button) button.innerHTML = panelState ? "Показати" : "Приховати"; // Зміна тексту кнопки

    const select = document.getElementById('panelSelect'); // Отримуємо select
    if (select) select.style.display = panelState ? 'none' : 'block'; // Показуємо/ховаємо select

    const resetButton = document.getElementById('resetButton'); // Отримуємо кнопку
    if (select) resetButton.style.display = panelState ? 'none' : 'block'; // Показуємо/ховаємо select

    const propertiesPanel = document.getElementById('propertiesPanel'); // шукаємо панель властивостей
    if (propertiesPanel) propertiesPanel.style.display = panelState ? 'none' : 'flex'; // Показуємо/ховаємо панель властивостей

    panel.dataset.panelState = (!panelState).toString(); // Оновлюємо стан панелі
}
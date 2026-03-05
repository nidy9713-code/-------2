/* 
   =========================================
   БАЗА ДАННЫХ (Список блюд)
   =========================================
   Мы храним всю информацию о блюдах в массиве объектов. 
   Объект {} — это одна карточка товара.
*/
const menuItems = [
    {
        id: 1,
        title: "Пицца Пепперони",
        category: "пицца",
        price: "590 ₽",
        calories: "280 ккал/100г",
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
        desc: "Классическая пицца с острыми колбасками пепперони и сыром моцарелла."
    },
    {
        id: 2,
        title: "Ролл Филадельфия",
        category: "роллы",
        price: "450 ₽",
        calories: "215 ккал/100г",
        img: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=800&auto=format&fit=crop",
        desc: "Нежный лосось, сливочный сыр, огурец и рис."
    },
    {
        id: 3,
        title: "Суши с лососем",
        category: "суши",
        price: "180 ₽",
        calories: "160 ккал/100г",
        img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop",
        desc: "Традиционные суши со свежим атлантическим лососем."
    },
    {
        id: 4,
        title: "Пицца Четыре сыра",
        category: "пицца",
        price: "620 ₽",
        calories: "310 ккал/100г",
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
        desc: "Сочетание четырех видов сыра: моцарелла, пармезан, чеддер и дорблю."
    },
    {
        id: 5,
        title: "Ролл Калифорния",
        category: "роллы",
        price: "390 ₽",
        calories: "195 ккал/100г",
        img: "https://images.unsplash.com/photo-1559466273-d95e72debaf8?q=80&w=800&auto=format&fit=crop",
        desc: "Краб-крем, огурец и икра масаго."
    },
    {
        id: 6,
        title: "Суши с креветкой",
        category: "суши",
        price: "210 ₽",
        calories: "145 ккал/100г",
        img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop",
        desc: "Тигровая креветка на подушке из ароматного риса."
    }
];

// Находим в HTML элементы, которыми будем управлять
const menuContainer = document.getElementById('menu-container');
const filterButtons = document.querySelectorAll('.filter-btn');

/* 
   =========================================
   ФУНКЦИЯ ОТОБРАЖЕНИЯ
   =========================================
   Эта функция создает карточки на экране на основе переданного списка (массива).
*/
function renderMenu(itemsToRender) {
    // 1. Создаем переменную для хранения HTML-кода
    let htmlContent = "";

    // 2. Перебираем список блюд (через цикл for...of - он самый простой для понимания)
    for (let item of itemsToRender) {
        // Добавляем к нашей строке новый кусок HTML для каждого блюда
        htmlContent += `
            <div class="menu-item">
                <div class="img-container">
                    <img src="${item.img}" alt="${item.title}">
                    <span class="calories">${item.calories}</span>
                </div>
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <span class="price">${item.price}</span>
                </div>
            </div>`;
    }

    // 3. Помещаем весь созданный HTML в контейнер на странице
    menuContainer.innerHTML = htmlContent;
}

/* 
   =========================================
   ОБРАБОТКА НАЖАТИЙ НА КНОПКИ (ФИЛЬТРЫ)
   =========================================
*/
filterButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        // 1. Убираем класс 'active' у всех кнопок и добавляем той, на которую нажали
        filterButtons.forEach(function (btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // 2. Узнаем, какую категорию выбрал пользователь
        // dataset.category берет значение из HTML атрибута data-category="..."
        const selectedCategory = button.dataset.category;

        // 3. Создаем новый отфильтрованный список
        let filteredItems = [];

        if (selectedCategory === "all") {
            // Если выбрано "Все", то берем весь изначальный список
            filteredItems = menuItems;
        } else {
            // Иначе перебираем меню и выбираем только нужную категорию
            for (let item of menuItems) {
                if (item.category === selectedCategory) {
                    filteredItems.push(item);
                }
            }
        }

        // 4. Показываем на экране только отфильтрованные блюда
        renderMenu(filteredItems);
    });
});

/* 
   =========================================
   ЗАПУСК ПРИ ОТКРЫТИИ СТРАНИЦЫ
   =========================================
*/
// Как только страница полностью загрузилась, рисуем всё меню
window.onload = function() {
    renderMenu(menuItems);
};

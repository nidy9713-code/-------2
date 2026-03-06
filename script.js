/* 
   =========================================
   БАЗА ДАННЫХ (Список блюд)
   =========================================
*/
const menuItems = [
    {
        id: 1,
        title: "Пицца Пепперони",
        category: "пицца",
        price: 590, // Теперь храним как число для расчетов
        calories: "280 ккал/100г",
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
        desc: "Классическая пицца с острыми колбасками пепперони и сыром моцарелла."
    },
    {
        id: 2,
        title: "Ролл Филадельфия",
        category: "роллы",
        price: 450,
        calories: "215 ккал/100г",
        img: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=800&auto=format&fit=crop",
        desc: "Нежный лосось, сливочный сыр, огурец и рис."
    },
    {
        id: 3,
        title: "Суши с лососем",
        category: "суши",
        price: 180,
        calories: "160 ккал/100г",
        img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop",
        desc: "Традиционные суши со свежим атлантическим лососем."
    },
    {
        id: 4,
        title: "Пицца Четыре сыра",
        category: "пицца",
        price: 620,
        calories: "310 ккал/100г",
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
        desc: "Сочетание четырех видов сыра: моцарелла, пармезан, чеддер и дорблю."
    },
    {
        id: 5,
        title: "Ролл Калифорния",
        category: "роллы",
        price: 390,
        calories: "195 ккал/100г",
        img: "https://images.unsplash.com/photo-1559466273-d95e72debaf8?q=80&w=800&auto=format&fit=crop",
        desc: "Краб-крем, огурец и икра масаго."
    },
    {
        id: 6,
        title: "Суши с креветкой",
        category: "суши",
        price: 210,
        calories: "145 ккал/100г",
        img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop",
        desc: "Тигровая креветка на подушке из ароматного риса."
    }
];

// Переменная для хранения товаров в корзине
let cart = [];

// Находим элементы управления
const menuContainer = document.getElementById('menu-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items-list');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total-price');

/* 
   =========================================
   ОТРИСОВКА МЕНЮ
   =========================================
*/
function renderMenu(itemsToRender) {
    let htmlContent = "";

    for (let item of itemsToRender) {
        htmlContent += `
            <div class="menu-item">
                <div class="img-container">
                    <img src="${item.img}" alt="${item.title}">
                    <span class="calories">${item.calories}</span>
                </div>
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <span class="price">${item.price} ₽</span>
                    <!-- Кнопка добавления. Передаем ID блюда в функцию -->
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        Добавить в корзину
                    </button>
                </div>
            </div>`;
    }
    menuContainer.innerHTML = htmlContent;
}

/* 
   =========================================
   ЛОГИКА КОРЗИНЫ
   =========================================
*/

// ФУНКЦИЯ ДОБАВЛЕНИЯ
function addToCart(itemId) {
    // 1. Проверяем, есть ли уже такой товар в корзине
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        // Если есть — просто увеличиваем количество
        existingItem.count += 1;
    } else {
        // Если нет — находим его в меню и добавляем в корзину с полем count: 1
        const product = menuItems.find(item => item.id === itemId);
        // Создаем копию объекта и добавляем count
        cart.push({ ...product, count: 1 });
    }

    updateCartUI();
    showToast("Товар добавлен в корзину");
}

// ФУНКЦИЯ УДАЛЕНИЯ (или уменьшения количества)
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        if (cart[itemIndex].count > 1) {
            cart[itemIndex].count -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    updateCartUI();
}

// ОБНОВЛЕНИЕ ИНТЕРФЕЙСА КОРЗИНЫ
function updateCartUI() {
    let totalCount = 0;
    for (let item of cart) {
        totalCount += item.count;
    }
    cartCount.innerText = totalCount;

    let totalPrice = 0;
    let itemsHtml = "";

    for (let item of cart) {
        totalPrice += item.price * item.count;
        itemsHtml += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.title}</strong><br>
                    <small>${item.price} ₽ x ${item.count}</small>
                </div>
                <div class="quantity-controls">
                    <button class="cart-btn" onclick="removeFromCart(${item.id})">-</button>
                    <span>${item.count}</span>
                    <button class="cart-btn" onclick="addToCart(${item.id})">+</button>
                </div>
            </div>
        `;
    }

    cartItemsList.innerHTML = cart.length === 0 ? "<p>Корзина пуста</p>" : itemsHtml;
    cartTotal.innerText = totalPrice + " ₽";
}

/* 
   =========================================
   УПРАВЛЕНИЕ ОКНОМ КОРЗИНЫ
   =========================================
*/
document.getElementById('cart-toggle').onclick = () => cartModal.style.display = 'block';
document.getElementById('close-cart').onclick = () => cartModal.style.display = 'none';

window.onclick = (event) => {
    if (event.target == cartModal) cartModal.style.display = 'none';
};

document.getElementById('checkout-btn').onclick = () => {
    if (cart.length === 0) {
        alert("Сначала добавьте хотя бы одно блюдо в корзину!");
    } else {
        alert("Заказ принят! Спасибо, что выбрали нас.");
        cart = [];
        updateCartUI();
        cartModal.style.display = 'none';
    }
};

/* 
   =========================================
   УВЕДОМЛЕНИЯ (Toast)
   =========================================
*/
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.innerText = message;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000);
}

/* 
   =========================================
   ФИЛЬТРЫ И СТАРТ
   =========================================
*/
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.dataset.category;
        const filtered = menuItems.filter(item => category === "all" || item.category === category);
        renderMenu(filtered);
    });
});

window.onload = () => renderMenu(menuItems);

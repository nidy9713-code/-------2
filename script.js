/* 
   =========================================
   1. ДАННЫЕ (База блюд)
   =========================================
*/
const menuItems = [
    {
        id: 1,
        title: "Пицца Пепперони",
        category: "пицца",
        price: 590,
        calories: 280,
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
        desc: "Классическая пицца с острыми колбасками пепперони и сыром моцарелла.",
        ingredients: [
            { name: "Колбаски", cal: 60 },
            { name: "Сыр моцарелла", cal: 40 },
            { name: "Томатный соус", cal: 10 }
        ]
    },
    {
        id: 2,
        title: "Ролл Филадельфия",
        category: "роллы",
        price: 450,
        calories: 215,
        img: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=800&auto=format&fit=crop",
        desc: "Нежный лосось, сливочный сыр, огурец и рис.",
        ingredients: [
            { name: "Лосось", cal: 50 },
            { name: "Сыр сливочный", cal: 40 },
            { name: "Огурец", cal: 5 },
            { name: "Рис", cal: 120 }
        ]
    },
    {
        id: 3,
        title: "Суши с лососем",
        category: "суши",
        price: 180,
        calories: 160,
        img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop",
        desc: "Традиционные суши со свежим атлантическим лососем.",
        ingredients: [
            { name: "Лосось", cal: 40 },
            { name: "Рис", cal: 120 }
        ]
    },
    {
        id: 4,
        title: "Пицца Четыре сыра",
        category: "пицца",
        price: 620,
        calories: 310,
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
        desc: "Сочетание четырех видов сыра: моцарелла, пармезан, чеддер и дорблю.",
        ingredients: [
            { name: "Сыр моцарелла", cal: 40 },
            { name: "Пармезан", cal: 40 },
            { name: "Чеддер", cal: 40 },
            { name: "Дорблю", cal: 40 }
        ]
    },
    {
        id: 5,
        title: "Ролл Калифорния",
        category: "роллы",
        price: 390,
        calories: 195,
        img: "https://images.unsplash.com/photo-1559466273-d95e72debaf8?q=80&w=800&auto=format&fit=crop",
        desc: "Краб-крем, огурец и икра масаго.",
        ingredients: [
            { name: "Краб-крем", cal: 30 },
            { name: "Огурец", cal: 5 },
            { name: "Икра масаго", cal: 40 },
            { name: "Рис", cal: 120 }
        ]
    },
    {
        id: 6,
        title: "Суши с креветкой",
        category: "суши",
        price: 210,
        calories: 145,
        img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop",
        desc: "Тигровая креветка на подушке из ароматного риса.",
        ingredients: [
            { name: "Креветка", cal: 25 },
            { name: "Рис", cal: 120 }
        ]
    },
    {
        id: 7,
        title: "Кофе Американо",
        category: "напитки",
        price: 150,
        calories: 5,
        img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
        desc: "Классический черный кофе из отборных зерен арабики.",
        ingredients: [
            { name: "Сахар", cal: 20 },
            { name: "Молоко", cal: 30 }
        ]
    },
    {
        id: 8,
        title: "Чай Зеленый",
        category: "напитки",
        price: 120,
        calories: 2,
        img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=800&auto=format&fit=crop",
        desc: "Освежающий зеленый чай с мягким вкусом.",
        ingredients: [
            { name: "Мята", cal: 0 },
            { name: "Лимон", cal: 2 },
            { name: "Мед", cal: 40 }
        ]
    },
    {
        id: 9,
        title: "Лимонад со смородиной",
        category: "напитки",
        price: 250,
        calories: 120,
        img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
        desc: "Домашний лимонад из свежей смородины и лимона.",
        ingredients: [
            { name: "Смородина", cal: 20 },
            { name: "Сахар", cal: 50 },
            { name: "Лед", cal: 0 }
        ]
    }
];

/* 
   =========================================
   2. ПЕРЕМЕННЫЕ И ЭЛЕМЕНТЫ
   =========================================
*/
let cart = [];

const elements = {
    menuContainer: document.getElementById('menu-container'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    cartModal: document.getElementById('cart-modal'),
    cartItemsList: document.getElementById('cart-items-list'),
    cartCount: document.getElementById('cart-count'),
    cartTotal: document.getElementById('cart-total-price'),
    cartToggle: document.getElementById('cart-toggle'),
    closeCart: document.getElementById('close-cart'),
    checkoutBtn: document.getElementById('checkout-btn')
};

/* 
   =========================================
   3. ЛОГИКА ОТОБРАЖЕНИЯ МЕНЮ
   =========================================
*/
function renderMenu(itemsToRender) {
    let htmlContent = "";

    for (let item of itemsToRender) {
        let ingredientsHtml = "";
        if (item.ingredients) {
            ingredientsHtml = `
                <div style="margin-bottom: 10px; font-size: 0.85rem;">
                    <p style="margin: 0 0 5px 0;"><strong>Убрать ингредиенты:</strong></p>
                    ${item.ingredients.map(ing => `
                        <label style="display: inline-block; margin-right: 10px; cursor: pointer;">
                            <input type="checkbox" checked 
                                   data-ingredient="${ing.name}" 
                                   data-cal="${ing.cal}" 
                                   onchange="updateItemCalories(${item.id})">
                            ${ing.name}
                        </label>
                    `).join("")}
                </div>
            `;
        }

        htmlContent += `
            <div class="menu-item" data-id="${item.id}">
                <div class="img-container">
                    <img src="${item.img}" alt="${item.title}">
                    <span class="calories">${item.calories} ккал/100г</span>
                </div>
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    ${ingredientsHtml}
                    <span class="price">${item.price} ₽</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                        Добавить в корзину
                    </button>
                </div>
            </div>`;
    }
    elements.menuContainer.innerHTML = htmlContent;
}

/* 
   =========================================
   4. ЛОГИКА КОРЗИНЫ (Добавление / Удаление)
   =========================================
*/
// Функция живого пересчета калорий на карточке
window.updateItemCalories = function(itemId) {
    const itemCard = document.querySelector(`.menu-item[data-id="${itemId}"]`);
    const calDisplay = itemCard.querySelector('.calories');
    const checkboxes = itemCard.querySelectorAll('input[type="checkbox"]');
    
    const baseItem = menuItems.find(item => item.id === itemId);
    let currentCalories = baseItem.calories;

    checkboxes.forEach(cb => {
        if (!cb.checked) currentCalories -= parseInt(cb.dataset.cal);
    });

    calDisplay.innerText = `${currentCalories} ккал/100г`;
};

window.addToCart = function(itemId) {
    const itemCard = document.querySelector(`.menu-item[data-id="${itemId}"]`);
    const checkboxes = itemCard.querySelectorAll('input[type="checkbox"]');
    
    let removedIngredients = [];
    const baseItem = menuItems.find(item => item.id === itemId);
    let finalCalories = baseItem.calories;

    checkboxes.forEach(cb => {
        if (!cb.checked) {
            removedIngredients.push(cb.dataset.ingredient);
            finalCalories -= parseInt(cb.dataset.cal);
        }
    });

    const existingItem = cart.find(item => 
        item.id === itemId && 
        JSON.stringify(item.removedIngredients) === JSON.stringify(removedIngredients)
    );

    if (existingItem) {
        existingItem.count += 1;
    } else {
        cart.push({ 
            ...baseItem, 
            count: 1, 
            removedIngredients: removedIngredients,
            finalCalories: finalCalories 
        });
    }

    updateCartUI();
    showToast("Товар добавлен в корзину");
};

window.removeFromCart = function(itemId, removedJson) {
    const removedIngredients = JSON.parse(removedJson);
    const itemIndex = cart.findIndex(item => 
        item.id === itemId && 
        JSON.stringify(item.removedIngredients) === JSON.stringify(removedIngredients)
    );

    if (itemIndex !== -1) {
        if (cart[itemIndex].count > 1) {
            cart[itemIndex].count -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
};

window.addOneMore = function(itemId, removedJson) {
    const removedIngredients = JSON.parse(removedJson);
    const item = cart.find(item => 
        item.id === itemId && 
        JSON.stringify(item.removedIngredients) === JSON.stringify(removedIngredients)
    );
    if (item) {
        item.count += 1;
        updateCartUI();
    }
};

function updateCartUI() {
    let totalCount = 0;
    let totalPrice = 0;
    let itemsHtml = "";

    for (let item of cart) {
        totalCount += item.count;
        totalPrice += item.price * item.count;
        
        let removedText = "";
        if (item.removedIngredients.length > 0) {
            removedText = `<br><small style="color: #e74c3c;">Без: ${item.removedIngredients.join(", ")}</small>`;
        }

        const removedJson = JSON.stringify(item.removedIngredients);

        itemsHtml += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.title}</strong>${removedText}<br>
                    <small>${item.price} ₽ x ${item.count}</small>
                    <br><small style="color: #7f8c8d;">${item.finalCalories} ккал/100г</small>
                </div>
                <div class="quantity-controls">
                    <button class="cart-btn" onclick='removeFromCart(${item.id}, ${JSON.stringify(removedJson)})'>-</button>
                    <span>${item.count}</span>
                    <button class="cart-btn" onclick='addOneMore(${item.id}, ${JSON.stringify(removedJson)})'>+</button>
                </div>
            </div>`;
    }

    elements.cartCount.innerText = totalCount;
    elements.cartTotal.innerText = totalPrice + " ₽";
    elements.cartItemsList.innerHTML = cart.length === 0 ? "<p>Корзина пуста</p>" : itemsHtml;
}

/* 
   =========================================
   5. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (Уведомления)
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
    setTimeout(() => toast.style.display = 'none', 2000);
}

/* 
   =========================================
   6. ИНИЦИАЛИЗАЦИЯ И СОБЫТИЯ
   =========================================
*/
document.addEventListener('DOMContentLoaded', () => {
    renderMenu(menuItems);

    elements.filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            elements.filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            const filtered = menuItems.filter(item => category === "all" || item.category === category);
            renderMenu(filtered);
        });
    });

    elements.cartToggle.onclick = () => elements.cartModal.style.display = 'block';
    elements.closeCart.onclick = () => elements.cartModal.style.display = 'none';

    window.onclick = (event) => {
        if (event.target == elements.cartModal) elements.cartModal.style.display = 'none';
    };

    elements.checkoutBtn.onclick = () => {
        if (cart.length === 0) {
            alert("Сначала добавьте хотя бы одно блюдо в корзину!");
        } else {
            alert("Заказ принят! Спасибо, что выбрали нас.");
            cart = [];
            updateCartUI();
            elements.cartModal.style.display = 'none';
        }
    };
});

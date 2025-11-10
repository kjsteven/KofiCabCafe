import { MENU_ITEMS, CATEGORIES, CATEGORY_LABELS } from './config.js';
import { state } from './state.js';
import { formatPrice, getCategoryLabel } from './utils.js';
import { openCustomizationModal, addSimpleItemToCart } from './cart.js';

export function renderCategoryTabs() {
    const tabsContainer = document.getElementById('categoryTabs');
    const categories = [
        { id: CATEGORIES.ALL, label: 'All Items' },
        ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label }))
    ];

    tabsContainer.innerHTML = categories.map(({ id, label }) => `
        <button 
            class="category-btn px-6 py-2 rounded-full font-semibold transition-all ${
                state.currentCategory === id 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }" 
            data-category="${id}">
            ${label}
        </button>
    `).join('');

    // Add event listeners
    tabsContainer.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.setCurrentCategory(btn.dataset.category);
            renderCategoryTabs();
            renderMenu();
        });
    });
}

export function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = state.currentCategory === CATEGORIES.ALL
        ? MENU_ITEMS
        : MENU_ITEMS.filter(item => item.category === state.currentCategory);

    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<p class="col-span-2 text-gray-500 text-center py-8">No items in this category</p>';
        return;
    }

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
            <div class="p-5">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs px-2 py-1 bg-amber-200 text-amber-900 rounded-full font-semibold">
                        ${getCategoryLabel(item.category)}
                    </span>
                </div>
                <h3 class="text-xl font-bold text-amber-900 mb-2">${item.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${item.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-amber-700">${formatPrice(item.price)}</span>
                    ${item.customizable
                        ? `<button class="customize-btn bg-amber-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-amber-700 transition-all shadow-md" data-item-id="${item.id}">Customize</button>`
                        : `<button class="add-simple-btn bg-amber-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-amber-700 transition-all shadow-md" data-item-id="${item.id}">Add +</button>`
                    }
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    menuGrid.querySelectorAll('.customize-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = MENU_ITEMS.find(i => i.id === parseInt(btn.dataset.itemId));
            openCustomizationModal(item);
        });
    });

    menuGrid.querySelectorAll('.add-simple-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = MENU_ITEMS.find(i => i.id === parseInt(btn.dataset.itemId));
            addSimpleItemToCart(item);
        });
    });
}

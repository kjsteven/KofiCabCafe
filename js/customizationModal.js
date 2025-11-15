import { SIZES, SUGAR_LEVELS, CATEGORIES } from './config.js';
import { state } from './state.js';
import { formatPrice, generateId } from './utils.js';
import { renderCart } from './cart.js';

let modalHandlersInitialized = false;

export function renderCustomizationModal() {
    const modal = document.getElementById('customModal');
    const item = state.currentItem;

    // Initialize handlers only once
    if (!modalHandlersInitialized) {
        initCustomizationModalHandlers();
        modalHandlersInitialized = true;
    }

    // Determine which options to show
    const showSugar = item.category !== CATEGORIES.SNACKS;

    // Update modal header
    document.getElementById('modalTitle').textContent = `Customize ${item.name}`;
    document.getElementById('modalPrice').textContent = `Base price: ${formatPrice(item.price)}`;
    document.getElementById('modalQuantity').textContent = '1';

    // Render size options
    renderSizeOptions();

    // Render sugar options
    document.getElementById('sugarOption').style.display = showSugar ? 'block' : 'none';
    if (showSugar) renderSugarOptions();

    updateModalPrice();
    modal.classList.remove('hidden');
}

function renderSizeOptions() {
    const container = document.getElementById('sizeButtons');
    container.innerHTML = SIZES.map(size => `
        <button 
            type="button"
            class="size-btn border-2 rounded-xl py-3 text-center hover:border-amber-500 transition-all ${
                state.customization.size.name === size.name ? 'border-amber-500 bg-amber-50' : 'border-amber-200'
            }" 
            data-name="${size.name}" 
            data-price="${size.price}">
            <div class="font-semibold">${size.name}</div>
            <div class="text-xs text-gray-500">${size.oz}</div>
        </button>
    `).join('');

    container.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            state.customization.size = {
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price)
            };
            renderSizeOptions();
            updateModalPrice();
        });
    });
}

function renderSugarOptions() {
    const container = document.getElementById('sugarButtons');
    const buttons = SUGAR_LEVELS.slice(0, 4).map(level => `
        <button 
            type="button"
            class="sugar-btn border-2 rounded-lg py-2 text-sm hover:border-amber-500 transition-all ${
                state.customization.sugar.name === level ? 'border-amber-500 bg-amber-50' : 'border-amber-200'
            }" 
            data-level="${level}">
            ${level}
        </button>
    `).join('');

    const lastButton = `
        <button 
            type="button"
            class="sugar-btn w-full mt-2 border-2 rounded-lg py-2 text-sm hover:border-amber-500 transition-all ${
                state.customization.sugar.name === '100%' ? 'border-amber-500 bg-amber-50' : 'border-amber-200'
            }" 
            data-level="100%">
            100%
        </button>
    `;

    container.innerHTML = buttons + lastButton;

    container.querySelectorAll('.sugar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            state.customization.sugar = {
                name: btn.dataset.level,
                price: 0
            };
            renderSugarOptions();
            updateModalPrice();
        });
    });
}

function updateModalPrice() {
    let total = state.currentItem.price;
    total += state.customization.size.price;
    total *= state.customization.quantity;

    document.getElementById('modalTotalPrice').textContent = formatPrice(total);
}

export function initCustomizationModalHandlers() {
    // Close modal
    document.getElementById('closeModalBtn').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('customModal').classList.add('hidden');
    });

    // Quantity controls
    document.getElementById('decreaseQty').addEventListener('click', (e) => {
        e.preventDefault();
        state.customization.quantity = Math.max(1, state.customization.quantity - 1);
        document.getElementById('modalQuantity').textContent = state.customization.quantity;
        updateModalPrice();
    });

    document.getElementById('increaseQty').addEventListener('click', (e) => {
        e.preventDefault();
        state.customization.quantity++;
        document.getElementById('modalQuantity').textContent = state.customization.quantity;
        updateModalPrice();
    });

    // Add to cart
    document.getElementById('addToCartBtn').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Add to cart clicked', state.currentItem, state.customization); // Debug log
        
        const cartItem = {
            id: generateId(),
            baseId: state.currentItem.id,
            name: state.currentItem.name,
            basePrice: state.currentItem.price,
            customization: JSON.parse(JSON.stringify(state.customization)),
            totalPrice: calculateItemPrice(),
            isSimple: false
        };

        state.addToCart(cartItem);
        renderCart();
        document.getElementById('customModal').classList.add('hidden');
    });
}

function calculateItemPrice() {
    let total = state.currentItem.price;
    total += state.customization.size.price;
    total *= state.customization.quantity;
    return total;
}

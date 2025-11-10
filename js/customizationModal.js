import { SIZES, SUGAR_LEVELS, ESPRESSO_SHOTS, TEMPERATURES, ADDONS, CATEGORIES } from './config.js';
import { state } from './state.js';
import { formatPrice, generateId } from './utils.js';
import { renderCart } from './cart.js';

export function renderCustomizationModal() {
    const modal = document.getElementById('customModal');
    const item = state.currentItem;

    // Determine which options to show
    const showShots = item.category === CATEGORIES.ESPRESSO;
    const showTemp = item.category !== CATEGORIES.SNACKS && item.category !== CATEGORIES.FRAPPE;
    const showSugar = item.category !== CATEGORIES.SNACKS;
    const showAddons = item.category !== CATEGORIES.SNACKS;
    const showExtraShotAddon = item.category === CATEGORIES.ESPRESSO;

    // Set frappe default temperature
    if (item.category === CATEGORIES.FRAPPE) {
        state.customization.temp = { name: 'Iced', price: 0 };
    }

    // Update modal header
    document.getElementById('modalTitle').textContent = `Customize ${item.name}`;
    document.getElementById('modalPrice').textContent = `Base price: ${formatPrice(item.price)}`;
    document.getElementById('modalQuantity').textContent = '1';

    // Render size options
    renderSizeOptions();

    // Render sugar options
    document.getElementById('sugarOption').style.display = showSugar ? 'block' : 'none';
    if (showSugar) renderSugarOptions();

    // Render shots options
    document.getElementById('shotsOption').style.display = showShots ? 'block' : 'none';
    if (showShots) renderShotsOptions();

    // Render temperature options
    document.getElementById('tempOption').style.display = showTemp ? 'block' : 'none';
    if (showTemp) renderTempOptions();

    // Render addons
    document.getElementById('addonsOption').style.display = showAddons ? 'block' : 'none';
    if (showAddons) renderAddons(showExtraShotAddon);

    updateModalPrice();
    modal.classList.remove('hidden');
}

function renderSizeOptions() {
    const container = document.getElementById('sizeButtons');
    container.innerHTML = SIZES.map(size => `
        <button 
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
        btn.addEventListener('click', () => {
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
            class="sugar-btn border-2 rounded-lg py-2 text-sm hover:border-amber-500 transition-all ${
                state.customization.sugar.name === level ? 'border-amber-500 bg-amber-50' : 'border-amber-200'
            }" 
            data-level="${level}">
            ${level}
        </button>
    `).join('');

    const lastButton = `
        <button 
            class="sugar-btn w-full mt-2 border-2 rounded-lg py-2 text-sm hover:border-amber-500 transition-all ${
                state.customization.sugar.name === '100%' ? 'border-amber-500 bg-amber-50' : 'border-amber-200'
            }" 
            data-level="100%">
            100%
        </button>
    `;

    container.innerHTML = buttons + lastButton;

    container.querySelectorAll('.sugar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.customization.sugar = {
                name: btn.dataset.level,
                price: 0
            };
            renderSugarOptions();
            updateModalPrice();
        });
    });
}

function renderShotsOptions() {
    const container = document.getElementById('shotsButtons');
    container.innerHTML = ESPRESSO_SHOTS.map(shot => `
        <button 
            class="shots-btn border-2 rounded-lg py-2 text-sm hover:border-amber-500 transition-all ${
                state.customization.shots.name === shot.name ? 'border-amber-500 bg-amber-50' : 'border-amber-200'
            }" 
            data-name="${shot.name}" 
            data-price="${shot.price}">
            ${shot.name}${shot.price > 0 ? `<br><span class="text-xs">+${formatPrice(shot.price)}</span>` : ''}
        </button>
    `).join('');

    container.querySelectorAll('.shots-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.customization.shots = {
                name: btn.dataset.name,
                price: parseFloat(btn.dataset.price)
            };
            renderShotsOptions();
            updateModalPrice();
        });
    });
}

function renderTempOptions() {
    const container = document.getElementById('tempButtons');
    container.innerHTML = TEMPERATURES.map(temp => `
        <button 
            class="temp-btn border-2 rounded-lg py-2 hover:border-amber-500 transition-all ${
                state.customization.temp.name === temp ? 'border-amber-500 bg-amber-50' : 'border-amber-200'
            }" 
            data-temp="${temp}">
            ${temp}
        </button>
    `).join('');

    container.querySelectorAll('.temp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.customization.temp = {
                name: btn.dataset.temp,
                price: 0
            };
            renderTempOptions();
            updateModalPrice();
        });
    });
}

function renderAddons(showExtraShot) {
    const container = document.getElementById('addonsList');
    const filteredAddons = ADDONS.filter(addon => !addon.espressoOnly || showExtraShot);

    container.innerHTML = filteredAddons.map(addon => `
        <label class="flex items-center justify-between p-3 border-2 border-amber-200 rounded-lg hover:border-amber-400 cursor-pointer">
            <span>${addon.name}</span>
            <div class="flex items-center gap-2">
                <span class="text-sm text-amber-700 font-semibold">+${formatPrice(addon.price)}</span>
                <input 
                    type="checkbox" 
                    class="addon-check w-5 h-5 text-amber-600" 
                    data-name="${addon.name}" 
                    data-price="${addon.price}">
            </div>
        </label>
    `).join('');

    container.querySelectorAll('.addon-check').forEach(cb => {
        cb.addEventListener('change', updateModalPrice);
    });
}

function updateModalPrice() {
    // Collect selected addons
    state.customization.addons = [];
    document.querySelectorAll('.addon-check:checked').forEach(cb => {
        state.customization.addons.push({
            name: cb.dataset.name,
            price: parseFloat(cb.dataset.price)
        });
    });

    let total = state.currentItem.price;
    total += state.customization.size.price;
    total += state.customization.shots.price;
    state.customization.addons.forEach(addon => total += addon.price);
    total *= state.customization.quantity;

    document.getElementById('modalTotalPrice').textContent = formatPrice(total);
}

export function initCustomizationModalHandlers() {
    // Close modal
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        document.getElementById('customModal').classList.add('hidden');
    });

    // Quantity controls
    document.getElementById('decreaseQty').addEventListener('click', () => {
        state.customization.quantity = Math.max(1, state.customization.quantity - 1);
        document.getElementById('modalQuantity').textContent = state.customization.quantity;
        updateModalPrice();
    });

    document.getElementById('increaseQty').addEventListener('click', () => {
        state.customization.quantity++;
        document.getElementById('modalQuantity').textContent = state.customization.quantity;
        updateModalPrice();
    });

    // Add to cart
    document.getElementById('addToCartBtn').addEventListener('click', () => {
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
    total += state.customization.shots.price;
    state.customization.addons.forEach(addon => total += addon.price);
    total *= state.customization.quantity;
    return total;
}

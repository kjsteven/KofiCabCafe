import { state } from './state.js';
import { formatPrice, generateId } from './utils.js';
import { renderCustomizationModal } from './customizationModal.js';

export function addSimpleItemToCart(item) {
    const cartItem = {
        id: generateId(),
        baseId: item.id,
        name: item.name,
        basePrice: item.price,
        customization: { quantity: 1 },
        totalPrice: item.price,
        isSimple: true
    };

    state.addToCart(cartItem);
    renderCart();
}

export function openCustomizationModal(item) {
    state.setCurrentItem(item);
    state.resetCustomization();
    renderCustomizationModal();
}

export function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    if (state.cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
        if (cartCount) cartCount.textContent = '0';
        if (cartTotal) cartTotal.textContent = formatPrice(0);
        return;
    }

    cartItemsContainer.innerHTML = state.cart.map(item => {
        if (item.isSimple) {
            return `
                <div class="bg-amber-50 rounded-xl p-4 shadow-sm">
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-800">${item.name}</h4>
                            <p class="text-amber-700 font-bold mt-2">${formatPrice(item.totalPrice)}</p>
                        </div>
                        <button class="remove-btn text-red-500 hover:text-red-700 font-bold" data-item-id="${item.id}">✕</button>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="bg-amber-50 rounded-xl p-4 shadow-sm">
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-800">${item.name}</h4>
                            <div class="text-xs text-gray-600 mt-1 space-y-1">
                                <div>Size: ${item.customization.size.name}</div>
                                <div>Sugar: ${item.customization.sugar.name}</div>
                            </div>
                            <p class="text-amber-700 font-bold mt-2">${formatPrice(item.totalPrice)} (${item.customization.quantity}x)</p>
                        </div>
                        <button class="remove-btn text-red-500 hover:text-red-700 font-bold" data-item-id="${item.id}">✕</button>
                    </div>
                </div>
            `;
        }
    }).join('');

    // Add event listeners for remove buttons
    cartItemsContainer.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.removeFromCart(parseInt(btn.dataset.itemId));
            renderCart();
        });
    });

    if (cartCount) cartCount.textContent = state.getCartItemCount();
    if (cartTotal) cartTotal.textContent = formatPrice(state.getCartTotal());
}

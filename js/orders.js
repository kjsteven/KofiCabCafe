import { state } from './state.js';
import { formatPrice, generateId } from './utils.js';
import { renderCart } from './cart.js';

export function renderRecentOrders() {
    const container = document.getElementById('recentOrders');

    if (state.orders.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">No orders yet</p>';
        return;
    }

    container.innerHTML = state.orders.slice(0, 5).map(order => `
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h4 class="font-bold text-lg text-amber-900">${order.customerName}</h4>
                    <p class="text-xs text-gray-500">${order.customerPhone}</p>
                    <p class="text-xs text-gray-500">${order.timestamp}</p>
                </div>
                <span class="bg-amber-600 text-white px-3 py-1 rounded-full font-bold text-sm">${formatPrice(order.total)}</span>
            </div>
            <div class="space-y-2 text-sm">
                ${order.items.map(item => {
                    if (item.isSimple) {
                        return `
                            <div class="text-gray-700">
                                <div class="font-semibold">1x ${item.name}</div>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="text-gray-700">
                                <div class="font-semibold">${item.customization.quantity}x ${item.name}</div>
                                <div class="text-xs text-gray-600 ml-3">${item.customization.size.name}, ${item.customization.sugar.name} sugar, ${item.customization.temp.name}</div>
                            </div>
                        `;
                    }
                }).join('')}
            </div>
            ${order.specialInstructions ? `<div class="mt-3 text-xs text-gray-600 italic bg-white p-2 rounded-lg">Note: ${order.specialInstructions}</div>` : ''}
            <button class="delete-order-btn mt-3 text-red-500 hover:text-red-700 text-sm font-semibold" data-order-id="${order.id}">Delete Order</button>
        </div>
    `).join('');

    // Add event listeners
    container.querySelectorAll('.delete-order-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this order?')) {
                state.deleteOrder(parseInt(btn.dataset.orderId));
                renderRecentOrders();
            }
        });
    });
}

export function initOrderHandlers() {
    const orderForm = document.getElementById('orderForm');

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const customerName = document.getElementById('customerName').value.trim();
        const customerPhone = document.getElementById('customerPhone').value.trim();
        const specialInstructions = document.getElementById('specialInstructions').value.trim();

        if (state.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const order = {
            id: generateId(),
            customerName,
            customerPhone,
            specialInstructions,
            items: [...state.cart],
            total: state.getCartTotal(),
            timestamp: new Date().toLocaleString()
        };

        state.addOrder(order);
        state.clearCart();

        orderForm.reset();
        renderCart();
        renderRecentOrders();

        alert(`Thank you ${customerName}! Your order has been placed successfully! We'll call you at ${customerPhone} when it's ready.`);
    });

    // Toggle recent orders
    document.getElementById('ordersToggleBtn').addEventListener('click', () => {
        const container = document.getElementById('recentOrdersContainer');
        const icon = document.getElementById('orderToggleIcon');

        if (container.classList.contains('hidden')) {
            container.classList.remove('hidden');
            icon.textContent = '▲';
        } else {
            container.classList.add('hidden');
            icon.textContent = '▼';
        }
    });
}

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
                                <div class="text-xs text-gray-600 ml-3">${item.customization.size.name}, ${item.customization.sugar.name} sugar</div>
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
            Swal.fire({
                icon: 'warning',
                title: 'Delete Order?',
                text: 'Are you sure you want to delete this order?',
                showCancelButton: true,
                confirmButtonColor: '#dc2626',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    state.deleteOrder(parseInt(btn.dataset.orderId));
                    renderRecentOrders();
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The order has been deleted.',
                        confirmButtonColor: '#d97706',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            });
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
            Swal.fire({
                icon: 'warning',
                title: 'Cart is Empty',
                text: 'Please add items to your cart before placing an order.',
                confirmButtonColor: '#d97706'
            });
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

        Swal.fire({
            icon: 'success',
            title: 'Order Placed!',
            html: `Thank you <strong>${customerName}</strong>!<br>Your order has been placed successfully!<br>We'll call you at <strong>${customerPhone}</strong> when it's ready.`,
            confirmButtonColor: '#d97706',
            confirmButtonText: 'Great!'
        });
    });
}

import { CATEGORIES } from './config.js';

class AppState {
    constructor() {
        this.cart = [];
        this.orders = [];
        this.currentCategory = CATEGORIES.ALL;
        this.currentItem = null;
        this.customization = this.getDefaultCustomization();
    }

    getDefaultCustomization() {
        return {
            size: { name: 'Medium', price: 0.50 },
            sugar: { name: '75%', price: 0 },
            shots: { name: 'Single', price: 0 },
            temp: { name: 'Hot', price: 0 },
            addons: [],
            quantity: 1
        };
    }

    resetCustomization() {
        this.customization = this.getDefaultCustomization();
    }

    setCurrentItem(item) {
        this.currentItem = item;
    }

    setCurrentCategory(category) {
        this.currentCategory = category;
    }

    addToCart(item) {
        this.cart.push(item);
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
    }

    clearCart() {
        this.cart = [];
    }

    addOrder(order) {
        this.orders.unshift(order);
    }

    deleteOrder(orderId) {
        this.orders = this.orders.filter(order => order.id !== orderId);
    }

    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    }

    getCartItemCount() {
        return this.cart.reduce((sum, item) => {
            return sum + (item.isSimple ? 1 : item.customization.quantity);
        }, 0);
    }
}

export const state = new AppState();

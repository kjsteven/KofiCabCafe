import { renderCategoryTabs, renderMenu } from './menuRenderer.js';
import { renderCart } from './cart.js';
import { renderRecentOrders, initOrderHandlers } from './orders.js';
import { initEmailJS } from './emailService.js';

function init() {
    // Initialize EmailJS
    initEmailJS();
    
    // Render initial UI
    renderCategoryTabs();
    renderMenu();
    renderCart();
    renderRecentOrders();

    // Initialize event handlers
    initOrderHandlers();
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

import { renderCategoryTabs, renderMenu } from './menuRenderer.js';
import { renderCart } from './cart.js';
import { renderRecentOrders, initOrderHandlers } from './orders.js';
import { initCustomizationModalHandlers } from './customizationModal.js';

function init() {
    // Render initial UI
    renderCategoryTabs();
    renderMenu();
    renderCart();
    renderRecentOrders();

    // Initialize event handlers
    initOrderHandlers();
    initCustomizationModalHandlers();

  
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

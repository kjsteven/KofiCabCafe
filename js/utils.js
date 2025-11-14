import { CATEGORY_LABELS } from './config.js';

export function formatPrice(price) {
    return `₱${price.toFixed(2)}`;
}

export function getCategoryLabel(category) {
    return CATEGORY_LABELS[category] || category;
}

export function generateId() {
    return Date.now();
}

export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

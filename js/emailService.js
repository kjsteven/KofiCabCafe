import { formatPrice } from './utils.js';

// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'jUukGigvKACQy4p6y';
const EMAILJS_SERVICE_ID = 'service_biayi2s';
const EMAILJS_TEMPLATE_ID = 'template_w7ee9dg';

// Initialize EmailJS
export function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
}

// Format order items for email template
function formatOrderItems(items) {
    return items.map(item => {
        if (item.isSimple) {
            return {
                name: item.name,
                units: 1,
                price: item.totalPrice.toFixed(2),
                customization: ''
            };
        } else {
            return {
                name: item.name,
                units: item.customization.quantity,
                price: item.totalPrice.toFixed(2),
                customization: `${item.customization.size.name}, ${item.customization.sugar.name} sugar`
            };
        }
    });
}

// Send order confirmation email
export async function sendOrderConfirmation(order) {
    try {
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS library not loaded');
            return { success: false, error: 'EmailJS not initialized' };
        }

        // Format items for the email template
        const formattedItems = formatOrderItems(order.items);
        
        // Create items HTML for email
        const itemsHTML = formattedItems.map(item => `
            <div style="padding: 14px 0; border-bottom: 1px solid #e8e4d9;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: #1a1a1a; font-size: 15px;">${item.name}</div>
                        ${item.customization ? `<div style="font-size: 12px; color: #666; margin-top: 4px;">${item.customization}</div>` : ''}
                        <div style="font-size: 13px; color: #888; margin-top: 6px;">Quantity: ${item.units}</div>
                    </div>
                    <div style="text-align: right; white-space: nowrap; padding-left: 16px;">
                        <strong style="font-size: 17px; color: #1a1a1a;">₱${item.price}</strong>
                    </div>
                </div>
            </div>
        `).join('');

        // Calculate totals (in PHP pesos)
        const subtotal = order.total.toFixed(2);
        const total = subtotal; // No shipping or tax for now
        
        // Create special instructions section HTML
        const specialInstructionsHTML = order.specialInstructions ? `
            <div style="margin-top: 20px; background-color: #ffffff; padding: 16px; border-radius: 4px; border-left: 4px solid #d4c5a0;">
                <div style="font-weight: bold; color: #1a1a1a; margin-bottom: 8px; font-size: 15px;">📝 Special Instructions:</div>
                <div style="color: #4a4a4a; font-style: italic; line-height: 1.5;">${order.specialInstructions}</div>
            </div>
        ` : '';
        
        // Prepare email template parameters
        const templateParams = {
            to_email: order.customerEmail,
            customer_name: order.customerName,
            order_id: order.id,
            order_date: order.timestamp,
            items_html: itemsHTML,
            special_instructions_section: specialInstructionsHTML,
            subtotal: subtotal,
            total: total,
            special_instructions: order.specialInstructions || 'None',
            email: order.customerEmail
        };

        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('Email sent successfully:', response);
        return { success: true, response };

    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

export const CATEGORIES = {
    ALL: 'all',
    ESPRESSO: 'espresso',
    NON_COFFEE: 'non-coffee',
    SNACKS: 'snacks'
};

export const CATEGORY_LABELS = {
    [CATEGORIES.ESPRESSO]: 'Espresso',
    [CATEGORIES.NON_COFFEE]: 'Non-Coffee',
    [CATEGORIES.SNACKS]: 'Snacks'
};

export const SIZES = [
    { name: 'Small', price: 0, oz: '12 oz' },
    { name: 'Medium', price: 0.50, oz: '16 oz' },
    { name: 'Large', price: 1.00, oz: '22 oz' }
];

export const SUGAR_LEVELS = ['0%', '25%', '50%', '75%', '100%'];

export const ESPRESSO_SHOTS = [
    { name: 'Single', price: 0 },
    { name: 'Double', price: 0.75 },
    { name: 'Triple', price: 1.50 },
    { name: 'Quad', price: 2.25 }
];

export const TEMPERATURES = ['Hot', 'Iced', 'Extra Hot'];

export const ADDONS = [
    { name: 'Extra Espresso Shot', price: 0.75, espressoOnly: true },
    { name: 'Whipped Cream', price: 0.50, espressoOnly: false },
    { name: 'Caramel Drizzle', price: 0.50, espressoOnly: false },
    { name: 'Vanilla Syrup', price: 0.50, espressoOnly: false },
    { name: 'Hazelnut Syrup', price: 0.50, espressoOnly: false },
    { name: 'Oat Milk', price: 0.75, espressoOnly: false }
];

export const MENU_ITEMS = [
    // Espresso Category
    {
        id: 1,
        name: "Hot Cappuccino",
        price: 4.50,
        description: "Espresso with steamed milk foam",
        category: CATEGORIES.ESPRESSO,
        image: "./menu/espresso/Hot_Cappuccino.jpg",
        customizable: true
    },
    {
        id: 2,
        name: "Hot Caramel Latte",
        price: 4.75,
        description: "Smooth latte with caramel sweetness",
        category: CATEGORIES.ESPRESSO,
        image: "./menu/espresso/Hot_Caramel_Latte.jpg",
        customizable: true
    },
    {
        id: 3,
        name: "Hot Latte",
        price: 4.50,
        description: "Smooth espresso with steamed milk",
        category: CATEGORIES.ESPRESSO,
        image: "./menu/espresso/Hot_Latte.jpg",
        customizable: true
    },
    {
        id: 4,
        name: "Hot Mocha",
        price: 5.25,
        description: "Chocolate and espresso delight",
        category: CATEGORIES.ESPRESSO,
        image: "./menu/espresso/Hot_Mocha.jpg",
        customizable: true
    },
    // Non-Coffee Category (includes Frappés and other drinks)
    {
        id: 5,
        name: "Apple Berry Refresher",
        price: 4.75,
        description: "Refreshing apple and berry blend",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Apple_Berry_Refresher.jpg",
        customizable: true
    },
    {
        id: 6,
        name: "Blueberry Cream",
        price: 5.25,
        description: "Creamy blueberry delight",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Blueberry_Cream.jpg",
        customizable: true
    },
    {
        id: 7,
        name: "Caramel Coffee Jelly Frappe",
        price: 5.75,
        description: "Blended caramel with coffee jelly",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Caramel_Coffee_Jelly_Frappe.jpg",
        customizable: true
    },
    {
        id: 8,
        name: "Caramel Macchiato",
        price: 5.50,
        description: "Caramel layered espresso drink",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Caramel_Macchiato.jpg",
        customizable: true
    },
    {
        id: 9,
        name: "Chocolate Hazelnut Macchiato",
        price: 5.75,
        description: "Rich chocolate and hazelnut blend",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Chocolate_Hazelnut_Macchiato.jpg",
        customizable: true
    },
    {
        id: 10,
        name: "Cinnamon Latte",
        price: 4.75,
        description: "Warm cinnamon spiced latte",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Cinnamon_Latte.jpg",
        customizable: true
    },
    {
        id: 11,
        name: "Iced Mocha",
        price: 5.25,
        description: "Refreshing iced chocolate coffee",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Iced_Mocha.jpg",
        customizable: true
    },
    {
        id: 12,
        name: "Kookie Krumble",
        price: 5.50,
        description: "Cookie crumble topped drink",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Kookie_Krumble.jpg",
        customizable: true
    },
    {
        id: 13,
        name: "Kookie Krumble Frappe",
        price: 6.00,
        description: "Blended cookie perfection",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Kookie_Krumble_Frappe.jpg",
        customizable: true
    },
    {
        id: 14,
        name: "Lemon Yakult Refresher",
        price: 4.50,
        description: "Tangy lemon yakult blend",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Lemon_Yakult_Refresher.jpg",
        customizable: true
    },
    {
        id: 15,
        name: "Lotus Biscoff Frappe",
        price: 6.25,
        description: "Blended lotus biscoff delight",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Lotus_Biscoff_Frappe.jpg",
        customizable: true
    },
    {
        id: 16,
        name: "Mango Cream Frappe",
        price: 5.75,
        description: "Tropical mango blended cream",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Mango_Cream_Frappe.jpg",
        customizable: true
    },
    {
        id: 17,
        name: "Matcha Cream",
        price: 5.25,
        description: "Creamy matcha goodness",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Matcha_Cream.jpg",
        customizable: true
    },
    {
        id: 18,
        name: "Matcha Latte",
        price: 4.75,
        description: "Premium Japanese green tea latte",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Matcha_Latter.jpg",
        customizable: true
    },
    {
        id: 19,
        name: "Mocha Frappe",
        price: 5.75,
        description: "Chocolate blended ice coffee",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Mocha_Frappe.jpg",
        customizable: true
    },
    {
        id: 20,
        name: "Passion Fruit Tea",
        price: 4.25,
        description: "Tropical passion fruit infusion",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Passion_Fruit_Tea.jpg",
        customizable: true
    },
    {
        id: 21,
        name: "Strawberry Soda Pop",
        price: 4.00,
        description: "Fizzy strawberry refreshment",
        category: CATEGORIES.NON_COFFEE,
        image: "./menu/noncoffee/Strawberry_Soda_Pop.jpg",
        customizable: false
    },
    // Snacks Category
    {
        id: 22,
        name: "Beef Tapa",
        price: 8.50,
        description: "Filipino marinated beef",
        category: CATEGORIES.SNACKS,
        image: "./menu/snacks/Beef_Tapa.jpg",
        customizable: false
    },
    {
        id: 23,
        name: "Chicken Thigh Fillet",
        price: 7.75,
        description: "Juicy chicken thigh fillet",
        category: CATEGORIES.SNACKS,
        image: "./menu/snacks/Chicken_Thigh_Fillet.jpg",
        customizable: false
    },
    {
        id: 24,
        name: "Cookies & Cream Kroffles",
        price: 6.50,
        description: "Croissant waffle with cookies & cream",
        category: CATEGORIES.SNACKS,
        image: "./menu/snacks/Cookies_&_Cream_Kroffles.jpg",
        customizable: false
    },
    {
        id: 25,
        name: "Corned Beef",
        price: 7.50,
        description: "Classic corned beef meal",
        category: CATEGORIES.SNACKS,
        image: "./menu/snacks/Corned_Beef.jpg",
        customizable: false
    },
    {
        id: 26,
        name: "Fish & Chips",
        price: 8.00,
        description: "Crispy fish with golden chips",
        category: CATEGORIES.SNACKS,
        image: "./menu/snacks/Fish_&_Chips.jpg",
        customizable: false
    },
    {
        id: 27,
        name: "Lotus Biscoff Kroffles",
        price: 6.75,
        description: "Croissant waffle with lotus biscoff",
        category: CATEGORIES.SNACKS,
        image: "./menu/snacks/Lotus_Biscoff_Kroffles.jpg",
        customizable: false
    },
    {
        id: 28,
        name: "Nutella Alcapone Kroffle",
        price: 7.00,
        description: "Indulgent nutella kroffle",
        category: CATEGORIES.SNACKS,
        image: "./menu/snacks/Nutella_Alcapone_Kroffle.jpg",
        customizable: false
    },
    {
        id: 29,
        name: "Strawberry Kroffles",
        price: 6.50,
        description: "Sweet strawberry kroffle delight",
        category: CATEGORIES.SNACKS,
        image: "./menu/snacks/Strawberry_Kroffles.jpg",
        customizable: false
    },
    {
        id: 30,
        name: "S'mores Kroffle",
        price: 6.75,
        description: "Marshmallow, chocolate & graham kroffle",
        category: CATEGORIES.SNACKS,
        image: "./menu/snacks/Smores_Kroffle.jpg",
        customizable: false
    }
];

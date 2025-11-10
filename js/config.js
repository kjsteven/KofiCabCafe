export const CATEGORIES = {
    ALL: 'all',
    ESPRESSO: 'espresso',
    FRAPPE: 'frappe',
    NON_COFFEE: 'non-coffee',
    SNACKS: 'snacks'
};

export const CATEGORY_LABELS = {
    [CATEGORIES.ESPRESSO]: 'Espresso',
    [CATEGORIES.FRAPPE]: 'Frappé',
    [CATEGORIES.NON_COFFEE]: 'Non-Coffee',
    [CATEGORIES.SNACKS]: 'Snacks'
};

export const SIZES = [
    { name: 'Small', price: 0, oz: '12 oz' },
    { name: 'Medium', price: 0.50, oz: '16 oz' },
    { name: 'Large', price: 1.00, oz: '20 oz' }
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
        name: "Espresso",
        price: 3.50,
        description: "Rich and bold Italian coffee",
        category: CATEGORIES.ESPRESSO,
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop",
        customizable: true
    },
    {
        id: 2,
        name: "Cappuccino",
        price: 4.50,
        description: "Espresso with steamed milk foam",
        category: CATEGORIES.ESPRESSO,
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
        customizable: true
    },
    {
        id: 3,
        name: "Latte",
        price: 4.75,
        description: "Smooth espresso with steamed milk",
        category: CATEGORIES.ESPRESSO,
        image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=300&fit=crop",
        customizable: true
    },
    {
        id: 4,
        name: "Americano",
        price: 3.75,
        description: "Espresso with hot water",
        category: CATEGORIES.ESPRESSO,
        image: "https://images.unsplash.com/photo-1532004491497-ba35c367d634?w=400&h=300&fit=crop",
        customizable: true
    },
    {
        id: 5,
        name: "Mocha",
        price: 5.25,
        description: "Chocolate and espresso delight",
        category: CATEGORIES.ESPRESSO,
        image: "https://images.unsplash.com/photo-1607260550778-aa9d29444ce1?w=400&h=300&fit=crop",
        customizable: true
    },
    // Frappé Category
    {
        id: 6,
        name: "Caramel Frappé",
        price: 5.50,
        description: "Blended ice coffee with caramel",
        category: CATEGORIES.FRAPPE,
        image: "https://images.unsplash.com/photo-1662047102608-a6f2e492411f?w=400&h=300&fit=crop",
        customizable: true
    },
    {
        id: 7,
        name: "Mocha Frappé",
        price: 5.75,
        description: "Chocolate blended ice coffee",
        category: CATEGORIES.FRAPPE,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
        customizable: true
    },
    {
        id: 8,
        name: "Vanilla Frappé",
        price: 5.25,
        description: "Smooth vanilla blended delight",
        category: CATEGORIES.FRAPPE,
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop",
        customizable: true
    },
    {
        id: 9,
        name: "Cookies & Cream Frappé",
        price: 6.00,
        description: "Oreo blended perfection",
        category: CATEGORIES.FRAPPE,
        image: "https://images.unsplash.com/photo-1568901599749-89810a0f48a6?w=400&h=300&fit=crop",
        customizable: true
    },
    // Non-Coffee Category
    {
        id: 10,
        name: "Hot Chocolate",
        price: 4.25,
        description: "Rich and creamy chocolate drink",
        category: CATEGORIES.NON_COFFEE,
        image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop",
        customizable: true
    },
    {
        id: 11,
        name: "Matcha Latte",
        price: 4.75,
        description: "Premium Japanese green tea latte",
        category: CATEGORIES.NON_COFFEE,
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop",
        customizable: true
    },
    {
        id: 12,
        name: "Chai Tea Latte",
        price: 4.50,
        description: "Spiced tea with steamed milk",
        category: CATEGORIES.NON_COFFEE,
        image: "https://images.unsplash.com/photo-1578899952107-9d9d729f58c6?w=400&h=300&fit=crop",
        customizable: true
    },
    {
        id: 13,
        name: "Fresh Lemonade",
        price: 3.75,
        description: "Freshly squeezed lemon juice",
        category: CATEGORIES.NON_COFFEE,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
        customizable: false
    },
    // Snacks Category
    {
        id: 14,
        name: "Croissant",
        price: 3.50,
        description: "Buttery French pastry",
        category: CATEGORIES.SNACKS,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
        customizable: false
    },
    {
        id: 15,
        name: "Blueberry Muffin",
        price: 3.25,
        description: "Fresh baked with real blueberries",
        category: CATEGORIES.SNACKS,
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop",
        customizable: false
    },
    {
        id: 16,
        name: "Chocolate Chip Cookie",
        price: 2.75,
        description: "Classic homemade cookie",
        category: CATEGORIES.SNACKS,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
        customizable: false
    },
    {
        id: 17,
        name: "Avocado Toast",
        price: 6.50,
        description: "Sourdough with fresh avocado",
        category: CATEGORIES.SNACKS,
        image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&h=300&fit=crop",
        customizable: false
    },
    {
        id: 18,
        name: "Ham & Cheese Panini",
        price: 7.25,
        description: "Grilled panini sandwich",
        category: CATEGORIES.SNACKS,
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
        customizable: false
    }
];

import { create } from 'zustand';

const useAppStore = create((set) => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    setUser: (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        set({ user });
    },

    cart: (() => {
        const savedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        // Limpiar productos viejos que traigan URLs externas (ej: fakestoreapi)
        const isStale = savedCart.some(item => typeof item.image === 'string' && item.image.startsWith('http'));
        if (isStale) {
            localStorage.setItem('cart', JSON.stringify([]));
            return [];
        }
        return savedCart;
    })(),
    addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        let newCart;
        if (existing) {
            newCart = state.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
            newCart = [...state.cart, { ...product, quantity: 1 }];
        }
        localStorage.setItem('cart', JSON.stringify(newCart));
        return { cart: newCart };
    }),

    removeFromCart: (id) => set((state) => {
        const newCart = state.cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return { cart: newCart };
    }),

    updateQuantity: (id, quantity) => set((state) => {
        if (quantity < 1) return state;
        const newCart = state.cart.map(item => item.id === id ? { ...item, quantity } : item);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return { cart: newCart };
    }),

    clearCart: () => {
        localStorage.setItem('cart', JSON.stringify([]));
        set({ cart: [] });
    },

    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    selectedCategory: '',
    setSelectedCategory: (cat) => set({ selectedCategory: cat })
}));

export default useAppStore;

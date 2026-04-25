import React from 'react';
import useAppStore from '../store/useAppStore';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useAppStore();
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        return (
            <div className="container empty-cart">
                <h2>Tu carrito está vacío 🛒</h2>
                <Link to="/">Volver a la Galería</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="section-title">Resumen de tu Carrito</h2>

            <div className="cart-list">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} />
                        <div className="item-info">
                            <h4>{item.title}</h4>
                            <p>{formatPrice(item.price)} c/u</p>
                        </div>

                        <div className="item-actions">
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            />
                            <p className="item-subtotal">{formatPrice(item.price * item.quantity)}</p>
                            <button
                                className="btn-remove"
                                onClick={() => removeFromCart(item.id)}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h3>Total: {formatPrice(total)}</h3>
                <div className="cart-summary-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button
                        className="btn-secondary"
                        onClick={() => {
                            if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                                clearCart();
                            }
                        }}
                    >
                        Vaciar Carrito
                    </button>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/checkout')}
                    >
                        Proceder al Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;

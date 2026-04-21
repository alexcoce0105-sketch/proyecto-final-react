import React, { useState } from 'react';
import useAppStore from '../store/useAppStore';
import { useNavigate, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import './Checkout.css';

const Checkout = () => {
    const { cart, clearCart, user } = useAppStore();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = (e) => {
        e.preventDefault();
        clearCart();
        setSuccess(true);
        setTimeout(() => {
            navigate('/');
        }, 5000);
    };

    if (success) {
        return (
            <div className="container success-msg">
                <h2>🎉 ¡Pago Exitoso!</h2>
                <p>Tu orden ha sido procesada correctamente.</p>
                <p>Serás redirigido al inicio en unos segundos...</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="container empty-cart">
                <h2>No hay items para pagar.</h2>
                <Link to="/">Volver al inicio</Link>
            </div>
        );
    }

    return (
        <div className="container checkout-container">
            <div className="checkout-summary">
                <h2>Tu Pedido</h2>
                <div className="summary-list">
                    {cart.map(item => (
                        <div key={item.id} className="summary-item">
                            <span>{item.quantity}x {item.title.substring(0, 20)}...</span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                    ))}
                </div>
                <h3 className="summary-total">Total a Pagar: {formatPrice(total)}</h3>
            </div>

            <div className="checkout-form">
                <h2>Datos de Envío</h2>
                <form onSubmit={handleCheckout}>
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        <input type="text" required defaultValue={user ? user.name : ''} />
                    </div>
                    <div className="form-group">
                        <label>Dirección de Envío</label>
                        <input type="text" required />
                    </div>
                    <div className="form-group">
                        <label>Tarjeta de Crédito</label>
                        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" required />
                    </div>
                    <div className="checkout-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="submit" className="btn-primary btn-pay">Confirmar y Pagar</button>
                        <button type="button" className="btn-secondary" onClick={() => navigate('/cart')} style={{ padding: '0.8rem', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar y Regresar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;

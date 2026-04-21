import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import './Navbar.css';

const Navbar = () => {
    const cart = useAppStore(state => state.cart);
    const user = useAppStore(state => state.user);
    const setUser = useAppStore(state => state.setUser);
    const searchQuery = useAppStore(state => state.searchQuery);
    const setSearchQuery = useAppStore(state => state.setSearchQuery);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (window.location.pathname !== '/') {
            navigate('/');
        }
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/" onClick={() => setSearchQuery('')}>🛍️ E-Shop Final</Link>
            </div>

            <div className="nav-search">
                <input
                    type="text"
                    placeholder="Buscar un producto..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className="nav-links">
                <Link to="/cart" className="cart-link">
                    🛒 Carrito ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                </Link>

                {user ? (
                    <div className="user-menu">
                        <span>Hola, {user.name}</span>
                        <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
                    </div>
                ) : (
                    <div className="auth-links">
                        <Link to="/login">Entrar</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import useAppStore from '../../store/useAppStore';
import { formatPrice } from '../../utils/formatPrice';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useAppStore();

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-img-wrapper" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.image} alt={product.title} />
            </Link>
            <div className="product-details">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 title={product.title}>{product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title}</h3>
                </Link>
                <p className="product-price">{formatPrice(product.price)}</p>
                <button className="btn-add" onClick={() => addToCart(product)}>
                    Añadir al Carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

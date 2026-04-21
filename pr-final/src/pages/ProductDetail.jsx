import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import axios from 'axios';
import { formatPrice } from '../utils/formatPrice';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useAppStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="container loader"><h2>Cargando producto...</h2></div>;
    if (!product) return <div className="container loader"><h2>Producto no encontrado</h2></div>;

    return (
        <div className="container product-detail-container">
            <Link to="/" className="back-link">← Volver a la Galería</Link>

            <div className="product-detail-card">
                <div className="product-detail-img">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="product-detail-info">
                    <p className="product-category">{product.category.toUpperCase()}</p>
                    <h2>{product.title}</h2>

                    <div className="product-rating">
                        ⭐ {product.rating?.rate} ({product.rating?.count} reseñas)
                    </div>

                    <p className="product-price-large">{formatPrice(product.price)}</p>

                    <div className="product-description">
                        <h3>Descripción</h3>
                        <p>{product.description}</p>
                    </div>

                    <button
                        className="btn-add-large"
                        onClick={() => addToCart(product)}
                    >
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

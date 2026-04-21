import React from 'react';
import ProductList from '../components/organisms/ProductList';
import './Home.css';

const Home = () => {
    return (
        <div className="container">
            <h2 className="section-title">Nuestros Productos</h2>
            <ProductList />
        </div>
    );
};

export default Home;

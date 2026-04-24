import React, { useState, useEffect } from 'react';
import useAppStore from '../../store/useAppStore';
import ProductCard from '../molecules/ProductCard';
import productsData from '../../mockdata/products';
import '../../pages/Home.css';

const ProductList = () => {
    const { searchQuery, selectedCategory, setSelectedCategory } = useAppStore();

    // Paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;


    // Filtrado por buscador y categoria
    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const uniqueCategories = [...new Set(productsData.map(p => p.category))];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Reiniciar a la pagina 1 si cambian los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    return (
        <div>
            <div className="filters-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #ccc', minWidth: '200px' }}
                >
                    <option value="">Todas las Categorías</option>
                    {uniqueCategories.map(cat => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                    ))}
                </select>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="no-results">No se encontraron productos.</p>
            ) : (
                <>
                    <div className="products-grid">
                        {currentItems.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <span>Página {currentPage} de {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductList;

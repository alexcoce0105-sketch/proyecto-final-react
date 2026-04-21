export const formatPrice = (priceInUSD) => {
    return (priceInUSD * 4000).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
};

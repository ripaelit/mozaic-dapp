import React from 'react';
import { productsData } from '../../data/dummy/product';
import ProductCard from './ProductCard';

export default function ProductList() {
  return (
    <>
      <div className='product-list-container'>
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <style jsx>{`
        .product-list-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          gap: 30px;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}

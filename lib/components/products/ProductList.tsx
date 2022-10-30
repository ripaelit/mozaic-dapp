import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LoadErrorType } from '../../types/common';
import { ProductType } from '../../types/product';
import PageErrorReloader from '../common/error/PageErrorReloader';
import ProductCardLoader from '../loader/ProductCardLoader';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [productList, setProductList] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | LoadErrorType>(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    axios
      .get('/products')
      .then((res) => {
        setTimeout(() => {
          setProductList(res.data);
          setLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setError({
          message: err.message,
          status: err.status,
          code: err.code,
        });
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className='product-list-container'>
        {!loading ? (
          !error ? (
            // product list
            productList &&
            productList!.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            // on error this error message will be shown
            <PageErrorReloader {...error} />
          )
        ) : (
          // on loading this loader component will be shown

          <>
            <ProductCardLoader />
            <ProductCardLoader />
          </>
        )}
      </div>
      <style jsx>{`
        .product-list-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          gap: 30px;
          flex-wrap: wrap;
          margin-bottom: 96px;
        }
      `}</style>
    </>
  );
}

import React, { useState } from 'react';
import Head from 'next/head';
import PageTitle from '../../lib/components/common/PageTitle';
import { useRouter } from 'next/router';
import KnowledgeBase from '../../lib/components/productInDepth/KnowledgeBase';
import PrimaryCard from '../../lib/components/common/card/PrimaryCard';
import ProductDetails from '../../lib/components/productInDepth/ProductDetails';

export default function Product() {
  const router = useRouter();
  const query: any = router.query;

  // loading state
  const [loading, setLoading] = useState<boolean>(true);
  // error state
  const [error, setError] = useState<boolean>(true);

  // initial product data
  const [productData, setProductData] = useState();

  return (
    <>
      <Head>
        <title>{`Mozaic - ${query.name}`}</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <main className='product-container'>
        <PageTitle
          title={query.name}
          button={{
            text: 'Back to Products',
            icon: '/assets/icons/ico.back.svg',
          }}
        />
        <ProductDetails />
        <KnowledgeBase />
      </main>
      <style jsx>{`
        .product-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          width: 100%;
          gap: 32px;
        }
      `}</style>
    </>
  );
}

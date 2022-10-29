import type { NextPage } from 'next';
import Head from 'next/head';
import PageTitle from '../lib/components/common/PageTitle';
import ProductList from '../lib/components/products/ProductList';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mozaic - Products</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <main className='products-container'>
        <PageTitle title='Our Products' />
        <ProductList />
      </main>
      <style jsx>{``}</style>
    </>
  );
};

export default Home;

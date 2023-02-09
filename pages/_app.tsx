import '../styles/globals.scss';
import '../styles/layout.scss';
import '../styles/colors.scss';
import '../styles/notification.scss';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../lib/redux/configureStore';
import Head from 'next/head';
import AppLayout from '../lib/AppLayout';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : 'http://localhost:8080';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Application wrapper
const AppContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Head>
        <title>Mozaic</title>
        <meta name='description' content='Write description here' />
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <AppLayout>{children}</AppLayout>
      <style jsx global>{`
        :root {
          --primary: #f3deb7;
          --primaryT1: #f3deb740;
          --primaryDark: #eec083;
          --textPrimary: #ffffff;
          --textPrimaryT1: #ffffff20;
          --textPrimaryT2: #ffffff05;
          --textSecondary: #777e91;
          --textLabel: #b1b5c3;
          --alert: #ffd500;
          --alertPositive: #11cabe;
          --alertNegative: #ff6838;
          --outlinePrimary: #353945;
          --tabActive: #272b30;
          --tabInactive: #111315;
          --cardBgPrimary: #1e1f25;
          --cardBgPrimaryT1: #1e1f25c1;
          --inputBtnBgPrimary: #23262f;
          --sliderGrad: linear-gradient(90deg, #f7931a 0%, #eec083 100%);
          --bg: #141518;
          --graphPrimary: #f7931a;
          --graphGrid: #252d55;
          --shadowPrimary: 0px 40px 64px -12px rgba(0, 0, 0, 0.08),
            0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  const getLibrary = (provider: any) => {
    const library = new Web3(provider);
    return library;
  };
  return (
    // Redux wrapper
    <Provider store={store}>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </Web3ReactProvider>
    </Provider>
  );
}

export default MyApp;

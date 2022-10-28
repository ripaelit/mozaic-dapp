import '../styles/globals.scss';
import '../styles/layout.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../lib/redux/configureStore';
import Head from 'next/head';
import AppLayout from '../lib/AppLayout';

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
          --primaryDark: #eec083;
          --textPrimary: #ffffff;
          --textSecondary: #777e91;
          --textLabel: #b1b5c3;
          --alert: #ffd500;
          --alertPositive: #11cabe;
          --alertNegative: #ff6838;
          --outlinePrimary: #353945;
          --tabActive: #272b30;
          --tabInactive: #111315;
          --cardBgPrimary: #1e1f25;
          --inputBtnBgPrimary: #23262f;
          --sliderGrad: linear-gradient(90deg, #f7931a 0%, #eec083 100%);
          --bg: #141518;
        }
      `}</style>
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Redux wrapper
    <Provider store={store}>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </Provider>
  );
}

export default MyApp;

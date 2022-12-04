import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Provider } from 'react-redux';
import store from '@/utils/store';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/Layout/Layout';
import '../styles/reset.css';
import '../styles/globals.css';

import theme from '@/utils/theme';
import { getAccount } from '@/slices/accountSlice';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(getAccount());
  }, []);

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;

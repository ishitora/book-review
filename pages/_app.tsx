import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/utils/store';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/Layout/Layout';
import '../styles/reset.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;

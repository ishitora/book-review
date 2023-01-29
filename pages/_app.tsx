import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

import store from '@/utils/store';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/Layout/Layout';
import '../styles/reset.css';
import '../styles/globals.css';

import theme from '@/utils/theme';
import { getAccount } from '@/slices/accountSlice';
import { useSession } from 'next-auth/react';
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  // useEffect(() => {
  //   if (
  //     !store.getState().account?.isLogin &&
  //     !store.getState().account?.isLoading &&
  //     !(router.asPath === '/login' || router.asPath === '/signup')
  //   ) {
  //     router.push('/login');
  //   }
  // }, [router]);

  // useEffect(() => {
  //   store.dispatch(getAccount()).then(() => {
  //     if (
  //       !store.getState().account?.isLogin &&
  //       !store.getState().account?.isLoading &&
  //       !(router.asPath === '/login' || router.asPath === '/signup')
  //     ) {
  //       router.push('/login');
  //     }
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;

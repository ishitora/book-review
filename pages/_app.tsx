import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { SessionProvider } from 'next-auth/react';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/utils/theme';
import createEmotionCache from '@/utils/createEmotionCache';
import { StyledEngineProvider } from '@mui/material/styles';
import Layout from '@/components/Layout/Layout';
import '../styles/reset.css';
import '../styles/globals.css';

import store from '@/utils/store';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>

          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SessionProvider session={session}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionProvider>
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default MyApp;

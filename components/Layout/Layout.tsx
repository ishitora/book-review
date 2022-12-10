import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import SideBar from '@/components/Layout/SideBar';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {
  children?: React.ReactNode;
};

const Layout = (props: Props) => {
  const router = useRouter();

  if (router.asPath === '/login' || router.asPath === '/signup') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          flex: 1,
          '&>div': {
            minHeight: '100vh',
            padding: '40px',
            '@media (max-width: 600px)': {
              padding: '12px',
            },
          },
        }}
      >
        {props.children}
      </Box>
    );
  }

  return (
    <>
      <SideBar />
      <Box
        as="main"
        sx={{
          marginLeft: '240px',
          maxWidth: 'calc(100vw - 240px)',
          flex: 1,
          '&>div': {
            padding: '20px 40px',
            '@media (max-width: 600px)': {
              padding: '12px',
            },
          },
        }}
      >
        <Header />
        {props.children}
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;

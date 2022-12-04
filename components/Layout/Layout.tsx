import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Box } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <Box
        as="main"
        sx={{
          flex: 1,
          '&>div': {
            padding: '40px',
            '@media (max-width: 600px)': {
              padding: '12px',
            },
          },
        }}
      >
        {props.children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;

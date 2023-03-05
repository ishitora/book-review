import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { closeSnackbar } from '@/slices/snackbarSlice';

import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

import { useRouter } from 'next/router';

type Props = {
  children?: React.ReactNode;
};

const Layout = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const snackbar = useAppSelector((state) => state.snackbar);

  if (router.asPath === '/login' || router.asPath === '/signup') {
    return (
      <>
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
        <Snackbar
          sx={{ minHeight: 0, padding: 'auto' }}
          open={snackbar.open}
          autoHideDuration={snackbar.autoHideDuration}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          onClose={() => {
            console.log('關閉');
            dispatch(closeSnackbar());
          }}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      {/* {isMobile ? (
        <Drawer isOpen={isOpen} placement="left" onClose={setIsOpen.off}>
          <DrawerOverlay>
            <DrawerContent
              sx={{
                maxWidth: '240px',
              }}
            >
              <SideBar />
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      ) : (
        <SideBar />
      )} */}
      <Header />
      <Box
        component="main"
        sx={{
          maxWidth: '100vw',
          flex: 1,
          '@media (max-width: 768px)': {
            margin: 0,
            maxWidth: '100vw',
          },
          '&>div': {
            // padding: '20px 40px',
            '@media (max-width: 600px)': {
              //   padding: '12px',
            },
          },
        }}
      >
        {props.children}
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;

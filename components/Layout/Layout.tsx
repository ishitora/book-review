import React, { useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
  useBoolean,
} from '@chakra-ui/react';

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
  const [isMobile] = useMediaQuery('(max-width: 768px)', {
    ssr: true,
    fallback: true,
  });
  const [isOpen, setIsOpen] = useBoolean();
  useEffect(() => {
    setIsOpen.off();
  }, [router.asPath, setIsOpen]);

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
      <Header toggle={setIsOpen.toggle} />
      <Box
        as="main"
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

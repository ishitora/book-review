import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

type Props = {
  children?: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;

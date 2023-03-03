import Head from 'next/head';
import Carousel from '@/components/Carousel';
import BookCarousel from '@/components/Carousel/BookCarousel';
import { GetStaticProps } from 'next';

import homeServers from '@/servers/homeServers';

export const getStaticProps: GetStaticProps = async () => {
  const layouts = await homeServers.getHomeLayout();

  return {
    props: {
      layouts: layouts,
    },
  };
};

export default function Home({ layouts }) {
  return (
    <>
      <Head>
        <title>book review</title>
      </Head>
      <div>
        <Carousel />
        {layouts.map((layout, index) => (
          <BookCarousel layout={layout} key={index} />
        ))}
      </div>
    </>
  );
}

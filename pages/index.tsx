import Head from 'next/head';

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/bookshelf',
      permanent: false,
    },
  };
}

export default function Home() {
  return (
    <>
      <Head>
        <title>book review</title>
      </Head>
      <div>首頁</div>
    </>
  );
}

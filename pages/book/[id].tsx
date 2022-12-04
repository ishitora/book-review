import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import BookDetail from '@/features/bookDetail/index';
import bookServers from '@/servers/bookServers';
import type { TBookDetail } from '@/types/book';
type Params = {
  params: {
    id: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const book = await bookServers.getBookData(params.id);

  return {
    props: { book },
  };
};

const BookPage = ({ book }: { book: TBookDetail }) => {
  return (
    <>
      <Head>
        <title>{book.title} - book review</title>
      </Head>
      <BookDetail book={book} />
    </>
  );
};

export default BookPage;

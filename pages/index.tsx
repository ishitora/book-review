import Head from 'next/head';
import Carousel from '@/components/Carousel';
import BookCarousel from '@/components/Carousel/BookCarousel';
import { GetStaticProps } from 'next';

import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';
//import Review from '@/models/Review';

const arr = [
  '64021744437da6516b92a6a4',
  '64021744437da6516b92a6a7',
  '64021744437da6516b92a6aa',
  '64021744437da6516b92a6b6',
  '640214dc437da6516b92a30c',
  '640214dc437da6516b92a30f',
  '640214dc437da6516b92a318',
  '64021737437da6516b92a68e',
  '64021737437da6516b92a691',
];

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();

  const allBooks = await Book.find({ _id: { $in: arr } }).transform((books) => {
    const newBooks = books.map((book) => ({
      id: book._id.toString(),
      title: book.title,
      authors: book.authors,
      image: book.image,
    }));

    return newBooks;
  });

  const layouts = [
    {
      title: '奇幻',
      books: allBooks,
    },
  ];

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

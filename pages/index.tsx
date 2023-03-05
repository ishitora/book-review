import Head from 'next/head';
import Carousel from '@/components/Carousel/ImageCarousel';
import BookCarousel from '@/components/Carousel/BookCarousel';
import { GetStaticProps } from 'next';

import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';
//import Review from '@/models/Review';

const popularBooks = [
  '64021690437da6516b92a660',
  '64049b664ecbfe67433434e1',
  '64049f274ecbfe6743343572',
  '6404a1794ecbfe67433435a6',
  '64049ba84ecbfe6743343514',
  '6404a1874ecbfe67433435b3',
  '6404a1a24ecbfe67433435ed',
];

const fantasyBooks = [
  '64021744437da6516b92a6a4',
  '64049e9d4ecbfe674334353e',
  '64021744437da6516b92a6aa',
  '64021744437da6516b92a6b6',
  '640214dc437da6516b92a30c',
  '640214dc437da6516b92a30f',
  '640214dc437da6516b92a318',
  '64021737437da6516b92a68e',
  '64021737437da6516b92a691',
];

const comicBooks = [
  '6404a1934ecbfe67433435cf',
  '6404a1934ecbfe67433435d2',
  '6402167f437da6516b92a63e',
  '64021664437da6516b92a5aa',
  '64021549437da6516b92a345',
  '6404a1934ecbfe67433435d5',
  '640215f8437da6516b92a52a',
];

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();

  const books1 = await Book.find({ _id: { $in: popularBooks } }).transform(
    (books) => {
      const newBooks = books.map((book) => ({
        id: book._id.toString(),
        title: book.title,
        authors: book.authors,
        image: book.image,
      }));
      return newBooks;
    }
  );
  const books2 = await Book.find({ _id: { $in: fantasyBooks } }).transform(
    (books) => {
      const newBooks = books.map((book) => ({
        id: book._id.toString(),
        title: book.title,
        authors: book.authors,
        image: book.image,
      }));
      return newBooks;
    }
  );
  const books3 = await Book.find({ _id: { $in: comicBooks } }).transform(
    (books) => {
      const newBooks = books.map((book) => ({
        id: book._id.toString(),
        title: book.title,
        authors: book.authors,
        image: book.image,
      }));
      return newBooks;
    }
  );

  const layouts = [
    {
      title: '近期熱門',
      books: books1,
    },
    {
      title: '奇幻小說',
      books: books2,
    },
    {
      title: '熱門漫畫',
      books: books3,
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

import nc from 'next-connect';
import axios from 'axios';
import dbConnect from '@/utils/dbConnect';
import Book from '@/models/Book';
import Review from '@/models/Review';

const handler = nc().get(async (req, res) => {
  const response = await axios.get(
    'https://www.googleapis.com/books/v1/volumes',
    {
      params: {
        q: `intitle:${req.query.keyword}`,
        key: 'AIzaSyDqcZhr7sjpyzbjSd9BU6FWC2TUpUCwpHk',
        filter: 'paid-ebooks',
        langRestrict: 'tw',
        printType: 'books',
        maxResults: 10,
        startIndex: (Number(req.query.p) - 1) * 10,
      },
    }
  );
  await dbConnect();

  console.log('google圖書結果', response.data);
  const books = response?.data.items;

  const bookIds = books.map((book) => book.id);

  const findBooks = await Book.find({
    googleBookId: { $in: bookIds },
  }).populate({
    path: 'ratings',
    transform: (doc) => {
      return doc ? { rating: doc?.rating } : null;
    },
  });

  const findIds = findBooks.map((book) => book.googleBookId);

  const searchRes = { total: response?.data.totalItems, books: [] };

  for (const book of books) {
    if (findIds.includes(book.id)) {
      searchRes.books.push(
        findBooks.find((fBook) => {
          return fBook.googleBookId === book.id;
        })
      );
    } else {
      const newBook = new Book({
        title: book.volumeInfo.title,
        googleBookId: book.id,
        reviews: [],
        bookLists: [],
        price: book.saleInfo.listPrice.amount,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        publisher: book.volumeInfo.publisher,
        publishedDate: book.volumeInfo.publishedDate || '',
        categories: book.volumeInfo.categories,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        ...(book.volumeInfo.industryIdentifiers?.[0]?.identifier && {
          ISBN: book.volumeInfo.industryIdentifiers?.[0]?.identifier,
        }),
        ...(book.volumeInfo.pageCount && {
          pageCount: book.volumeInfo.pageCount,
        }),
        textSnippet: book?.searchInfo?.textSnippet || '',
        readers: {
          want_to_read: [],
          currently_reading: [],
          read: [],
        },
      });

      const saveBook = await newBook.save();
      searchRes.books.push(
        await saveBook.populate({
          path: 'ratings',
          transform: (doc) => {
            return doc ? { rating: doc?.rating } : null;
          },
        })
      );
    }
  }

  res.json(searchRes);
});

export default handler;

import React from 'react';

type Book = { title: String };

type Props = {
  book: Book;
};

const BookCard = ({ book }: Props) => {
  return (
    <div>
      BookCard
      {book.title}
    </div>
  );
};

export default BookCard;

import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination/index';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks: { smallThumbnail: string };
  };
};
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Search = () => {
  const router = useRouter();
  const { keyword, p } = router.query;
  const { data } = useSWR(`/api/search/${keyword}?p=${p}`, fetcher);

  const changePage = (page: number) => {
    if (typeof keyword === 'string') {
      if (keyword.trim() !== '') {
        router.push(`/search/${keyword.trim()}?p=${page}`);
      }
    }
  };

  if (!data) {
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    );
  }

  return (
    <div>
      {data?.books?.map((book: Book) => (
        <div
          key={book.id}
          onClick={() => {
            router.push(`/book/${book.id}`);
          }}
        >
          <Image
            src={book?.image}
            width={80}
            height={80}
            alt={book.image + ' image'}
          />

          {book.title}
        </div>
      ))}
      <Pagination
        p={Number(p)}
        total={data?.total}
        count={10}
        changePage={changePage}
      />
    </div>
  );
};

export default Search;

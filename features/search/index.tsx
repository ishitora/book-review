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
      {data?.items?.map((book: Book) => (
        <div key={book.id}>
          <Image
            src={book?.volumeInfo?.imageLinks?.smallThumbnail}
            width={80}
            height={80}
            alt={book.volumeInfo.title + ' image'}
          />

          {book.volumeInfo.title}
        </div>
      ))}
      <Pagination
        p={Number(p)}
        total={data?.totalItems}
        count={20}
        changePage={changePage}
      />
    </div>
  );
};

export default Search;

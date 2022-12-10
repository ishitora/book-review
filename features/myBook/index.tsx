import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/redux';

import {
  Button,
  Stack,
  Box,
  Link,
  Divider,
  Center,
  Heading,
} from '@chakra-ui/react';

import History from './components/History';
type Props = {};

const MyBook = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const myBooks = useAppSelector((state) => state.account.info?.myBooks || []);

  const curBook = myBooks.find((myBook) => myBook.book.id === id);
  if (!curBook) {
    return <div>dd</div>;
  }
  console.log(curBook);
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Stack>
          <Box
            sx={{
              position: 'relative',
              width: '220px',
              height: '300px',
              overflow: 'hidden',
              boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <Image
              src={curBook.book?.image}
              fill
              alt={curBook.book.image + ' image'}
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Heading>{curBook.book.title}</Heading>
          <p>{curBook.book.authors}</p>
        </Stack>
        <History
          status={curBook.status}
          create_date={curBook.create_date}
          start_date={curBook.start_date}
          finish_date={curBook.finish_date}
        />
      </Box>
    </div>
  );
};

export default MyBook;

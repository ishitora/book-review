import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

import History from './components/History';

const MyBook = () => {
  const router = useRouter();
  const { id } = router.query;
  const myBooks = useAppSelector((state) => state.account.info?.myBooks || []);

  const curBook = myBooks.find((myBook) => myBook.book.id === id);

  if (!curBook) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',

          '@media (max-width:600px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <Stack
          sx={{
            marginRight: '40px',
            '@media (max-width:600px)': {
              marginRight: 0,
            },
          }}
        >
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
          <Typography>{curBook.book.title}</Typography>
          <p>{curBook.book.authors}</p>
        </Stack>
        <History
          status={curBook.status}
          create_date={curBook.create_date}
          start_date={curBook.start_date}
          finish_date={curBook.finish_date}
        />
      </Box>
    </Box>
  );
};

export default MyBook;

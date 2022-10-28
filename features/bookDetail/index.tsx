import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import Image from 'next/image';
import { Box, Text, Stack, Button } from '@chakra-ui/react';

import AddReviewModal from './components/AddReviewModal';

const BookDetail = () => {
  const router = useRouter();
  console.log(router.query);
  const { id } = router.query;

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(id ? `/api/book/${id}` : null, fetcher);

  if (!data) {
    return 'loading...';
  }
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',

        display: 'grid',
        gridTemplateColumns: '3fr 4fr 2fr',
        gridAutoRows: ' minmax(30px, auto)',
        gridTemplateAreas: `
        "title title title"
        "image info other"
        "description description other"
        "rating rating other"
        "reviews reviews other"
        `,
      }}
    >
      <Text sx={{ gridArea: 'title', fontSize: '1.6rem', fontWeight: 700 }}>
        {data.title}
      </Text>
      <Box sx={{ gridArea: 'image' }}>
        <Image
          src={data?.image}
          width={200}
          height={200}
          objectFit="contain"
          alt={data.image + ' image'}
        />
      </Box>

      <Stack sx={{ gridArea: 'info' }}>
        <Text>
          作者:
          {data.authors.map((author) => (
            <a key={author}>{author}</a>
          ))}
        </Text>
        <Text>出版社:{data.publisher}</Text>
        {data.ISBN && <Text> ISBN:{data.ISBN}</Text>}
        {data.publishedDate && <Text>出版日期:{data.publishedDate}</Text>}
        {data.categories?.length > 0 && (
          <Text>
            類別:
            {data.categories.map((category) => (
              <a key={category}>{category}</a>
            ))}
          </Text>
        )}
        {data.price && <Text> 建議售價:{data.price}</Text>}
        {data.pageCount && <Text> 頁數:{data.pageCount}</Text>}
      </Stack>

      <Box sx={{ gridArea: 'description' }}>
        <h3>內容簡介:</h3>
        <Box
          sx={{
            fontSize: '0.9rem',
            wordBreak: 'break-all',
            whiteSpace: 'pre-line',
          }}
        >
          {data.description}
        </Box>
      </Box>

      <Box sx={{ gridArea: 'rating' }}>評分</Box>
      <Box sx={{ gridArea: 'reviews' }}>
        評論
        <AddReviewModal />
      </Box>

      <Box sx={{ gridArea: 'other' }}>0人想看 0人正在閱讀 0人已看過</Box>
    </Box>
  );
};

export default BookDetail;

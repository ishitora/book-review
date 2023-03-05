import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

import BookCard from '@/components/BookCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from './book.module.css';

const BookCarousel = ({ layout }) => {
  return (
    <Box
      sx={{
        width: 'min(100vw, 1200px)',
        maxWidth: '100%',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
      }}
    >
      <Typography
        sx={{
          marginBottom: '32px',
        }}
        variant="h5"
      >
        {layout.title}
      </Typography>

      <Swiper
        loop={true}
        autoHeight={true}
        observer={true}
        observeParents={true}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className={styles.swiper}
      >
        {layout.books.map((book) => (
          <SwiperSlide key={book.id} className={styles['swiper-slide']}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default BookCarousel;

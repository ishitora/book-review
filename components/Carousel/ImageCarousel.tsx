import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useMediaQuery } from '@mui/material';

import styles from './image.module.css';

const Carousel = () => {
  const isMobile = useMediaQuery('(max-width: 600px)', { noSsr: true });

  return (
    <Swiper
      spaceBetween={30}
      effect={'fade'}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Navigation, Pagination]}
      className={styles.swiper}
    >
      <SwiperSlide className={styles['swiper-slide']}>
        <img
          src={isMobile ? '/image/mobile_1.png' : '/image/main_1.png'}
          alt="image1"
        />
      </SwiperSlide>
      <SwiperSlide className={styles['swiper-slide']}>
        <img
          src={isMobile ? '/image/mobile_2.png' : '/image/main_2.png'}
          alt="image2"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;

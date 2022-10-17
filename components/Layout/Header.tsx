import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      router.push(`/search/${keyword.trim()}?p=1`);
    }
  };

  return (
    <Box
      as="header"
      h="90"
      display="flex"
      alignItems="center"
      bgColor="#f2f2f2"
    >
      <Image
        src="/image/logo.png"
        width={170}
        height={80}
        alt="Picture of the author"
        onClick={() => {
          router.push('/');
        }}
      />
      <Input
        placeholder="搜尋書本"
        bgColor="#fff"
        value={keyword}
        onChange={handleChange}
      />
      <Button colorScheme="blue" onClick={handleSearch}>
        搜尋
      </Button>
    </Box>
  );
};

export default Header;

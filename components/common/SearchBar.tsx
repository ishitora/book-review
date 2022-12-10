import React, { useState, KeyboardEvent } from 'react';

import { useRouter } from 'next/router';

import Input from '@/components/common/Input';
import { MdSearch } from 'react-icons/md';
const SearchBar = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      router.push(`/search/${keyword.trim()}?p=1`);
      setKeyword('');
    }
  };

  const handlePress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <Input
      noHelpText
      placeholder="搜尋書本"
      value={keyword}
      onChange={handleChange}
      onKeyPress={handlePress}
      rightElement={{
        width: '70px',
        ele: <MdSearch onClick={handleSearch} style={{ fontSize: '24px' }} />,
      }}
    />
  );
};

export default SearchBar;

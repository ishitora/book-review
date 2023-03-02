import React, { useState, KeyboardEvent } from 'react';

import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        '@media (max-width: 600px)': {
          flex: '0 0 100%',
          order: 1,
        },

        '&>button': {
          cursor: 'pointer',
          height: '40px',
          position: 'relative',
          left: '-2px',
          backgroundColor: 'primary.main',
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: '3px',
          borderLeft: 'none',

          '&>svg': {
            color: '#fff',
          },
        },
      }}
    >
      <TextField
        placeholder="搜尋書本"
        value={keyword}
        onChange={handleChange}
        onKeyPress={handlePress}
        size="small"
        sx={{
          width: '200px',
          '&>.MuiInputBase-root': {
            height: '100%',
          },
          '@media (max-width: 600px)': {
            flex: 1,
          },
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                setKeyword('');
              }}
              sx={{
                display: keyword ? 'flex' : 'none',
                width: '25px',
                height: '25px',
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
      <button onClick={handleSearch}>
        <SearchIcon />
      </button>
    </Box>
  );
};

export default SearchBar;

import React, { useState, useMemo } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useAppSelector } from '@/hooks/redux';

import Box from '@mui/material/Box';

import BookList from './components/BookList';

const Bookshelf = () => {
  const myBooks = useAppSelector((state) => state.account.info?.myBooks || []);

  const [wantToReadBooks, readingBooks, readBooks] = useMemo(() => {
    return [
      myBooks.filter((book) => book.status === 0),
      myBooks.filter((book) => book.status === 1),
      myBooks.filter((book) => book.status === 2),
    ];
  }, [myBooks]);

  const [type, setType] = React.useState('0');
  const [page, setPage] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newType: string) => {
    setType(newType);
    setPage(1);
  };

  const changePage = (p: number) => {
    setPage(p);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <TabContext value={type}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="書櫃" centered>
            <Tab label="全部書籍" value="0" />
            <Tab
              disabled={!(wantToReadBooks.length > 0)}
              label="想讀"
              value="1"
            />
            <Tab
              disabled={!(readingBooks.length > 0)}
              label="閱讀中"
              value="2"
            />
            <Tab disabled={!(readBooks.length > 0)} label="已完成" value="3" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <BookList books={myBooks} page={page} changePage={changePage} />
        </TabPanel>
        <TabPanel value="1">
          <BookList
            books={wantToReadBooks}
            page={page}
            changePage={changePage}
          />
        </TabPanel>
        <TabPanel value="2">
          <BookList books={readingBooks} page={page} changePage={changePage} />
        </TabPanel>
        <TabPanel value="3">
          <BookList books={readBooks} page={page} changePage={changePage} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Bookshelf;

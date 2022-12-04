import React, { useState, useMemo } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/redux';

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

  const [page, setPage] = useState(1);

  const changePage = (p: number) => {
    setPage(p);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Tabs
        variant="soft-rounded"
        colorScheme="primary"
        onChange={() => setPage(1)}
      >
        <TabList
          sx={{
            width: '100%',
            display: 'inline-flex',
            justifyContent: 'center',
          }}
        >
          <Tab>全部書籍</Tab>
          <Tab isDisabled={!(wantToReadBooks.length > 0)}>想讀</Tab>
          <Tab isDisabled={!(readingBooks.length > 0)}>閱讀中</Tab>
          <Tab isDisabled={!(readBooks.length > 0)}>已完成</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <BookList books={myBooks} page={page} changePage={changePage} />
          </TabPanel>
          <TabPanel>
            <BookList
              books={wantToReadBooks}
              page={page}
              changePage={changePage}
            />
          </TabPanel>
          <TabPanel>
            <BookList
              books={readingBooks}
              page={page}
              changePage={changePage}
            />
          </TabPanel>
          <TabPanel>
            <BookList books={readBooks} page={page} changePage={changePage} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Bookshelf;

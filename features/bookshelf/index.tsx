import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useAppSelector } from '@/hooks/redux';
type Props = {};

const Bookshelf = (props: Props) => {
  const myBooks = useAppSelector((state) => state.account.info?.myBooks) || [];

  return (
    <div>
      書櫃
      <Tabs>
        <TabList>
          <Tab>全部書籍</Tab>
          <Tab>想讀</Tab>
          <Tab>閱讀中</Tab>
          <Tab>已完成</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Bookshelf;

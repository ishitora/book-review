import React from 'react';
import { Button, Stack, Box, Heading, Divider, Center } from '@chakra-ui/react';
import { MdOutlineModeStandby } from 'react-icons/md';
import { bookshelfStatus } from '@/constants/constant';
type Props = {
  status: 0 | 1 | 2;
  create_date: string;
  start_date?: string;
  finish_date?: string;
};

const History = ({ status, create_date, start_date, finish_date }: Props) => {
  return (
    <Box>
      <Heading
        as="h3"
        size="lg"
        sx={{
          color(theme) {
            return theme.colors.primary[800];
          },
        }}
      >
        {bookshelfStatus[status]}
      </Heading>
      <Box sx={{ display: 'flex', marginTop: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 'max-content',
            '&>svg': {
              fontSize: '40px',
            },
          }}
        >
          <MdOutlineModeStandby />
          <Center height="20px">
            <Divider
              orientation="vertical"
              sx={{
                borderWidth: '3px',
                opacity: 1,
                borderColor(theme) {
                  return start_date ? theme.colors.primary[700] : '#ccc';
                },
              }}
            />
          </Center>
          <MdOutlineModeStandby style={start_date ? {} : { color: '#ccc' }} />
          <Center height="20px">
            <Divider
              orientation="vertical"
              sx={{
                borderWidth: '3px',
                opacity: 1,
                borderColor(theme) {
                  return finish_date ? theme.colors.primary[700] : '#ccc';
                },
              }}
            />
          </Center>
          <MdOutlineModeStandby style={finish_date ? {} : { color: '#ccc' }} />
        </Box>
        <Box
          sx={{
            padding: '6px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <p>加入日期:{create_date}</p>
          <p>開始日期:{start_date}</p>
          <p>結束日期:{finish_date}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default History;

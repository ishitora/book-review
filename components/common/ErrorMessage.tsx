import React from 'react';
import { Box, Text } from '@chakra-ui/react';
type Props = { children: React.ReactNode };

const ErrorMessage = ({ children }: Props) => {
  return (
    <Box h="18px">
      <Text color="#ff0000" fontSize="12px">
        {children}
      </Text>
    </Box>
  );
};

export default ErrorMessage;

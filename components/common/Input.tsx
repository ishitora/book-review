import React from 'react';
import type { Noop } from 'react-hook-form';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

type Props = {
  id?: string;
  type?: string;
  placeholder?: string;
  leftElement?: {
    width?: string;
    ele: React.ReactNode;
  };
  rightElement?: {
    width?: string;
    ele: React.ReactNode;
  };
  onChange: (...event: [React.ChangeEvent]) => void;
  onBlur?: Noop;
  value: string;
  name?: string;
  errorMessage?: string;
};

const CustomInput = ({
  id,
  type = 'text',
  placeholder = '',
  leftElement,
  rightElement,
  onChange,
  onBlur,
  name,
  errorMessage,
}: Props) => {
  return (
    <Box>
      <InputGroup>
        {leftElement?.ele && (
          <InputLeftElement width={leftElement?.width}>
            {leftElement.ele}
          </InputLeftElement>
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        />
        {rightElement?.ele && (
          <InputRightElement width={rightElement?.width}>
            {rightElement.ele}
          </InputRightElement>
        )}
      </InputGroup>
      <Text fontSize="12px" color="red" position="absolute">
        {errorMessage}
      </Text>
    </Box>
  );
};

export default CustomInput;

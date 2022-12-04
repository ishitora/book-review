import React from 'react';
import type { Noop } from 'react-hook-form';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import ErrorMessage from './ErrorMessage';
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
  noHelpText?: boolean;
  size?: 'lg' | 'md' | 'sm' | 'xs';
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
  noHelpText,
  size,
}: Props) => {
  return (
    <Box>
      <InputGroup size={size || 'md'}>
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
          isInvalid={Boolean(errorMessage)}
          sx={{ backgroundColor: '#fff' }}
          size={size || 'md'}
        />
        {rightElement?.ele && (
          <InputRightElement width={rightElement?.width}>
            {rightElement.ele}
          </InputRightElement>
        )}
      </InputGroup>
      {!noHelpText && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Box>
  );
};

export default CustomInput;

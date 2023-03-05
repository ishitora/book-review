import React, { KeyboardEvent } from 'react';
import type { Noop } from 'react-hook-form';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

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
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: Noop;
  value: string;
  name?: string;
  errorMessage?: string;
  noHelpText?: boolean;
  fullWidth?: boolean;
};

const CustomInput = ({
  id,
  type = 'text',
  placeholder = '',
  leftElement,
  rightElement,
  onChange,
  onKeyPress = () => {
    return;
  },
  onBlur,
  name,
  errorMessage,
  noHelpText,
  fullWidth,
}: Props) => {
  return (
    <Box>
      <OutlinedInput
        {...(fullWidth ? { fullWidth: true } : {})}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
        name={name}
        error={Boolean(errorMessage)}
        sx={{
          backgroundColor: '#fff',
          border: '1px solid',
          borderColor: '#ccc',
          '&>input:-webkit-autofill': {
            transition: 'background-color 600000s 0s, color 600000s 0s',
          },
        }}
        {...(leftElement
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  {leftElement.ele}
                </InputAdornment>
              ),
            }
          : {})}
        {...(rightElement
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  {rightElement.ele}
                </InputAdornment>
              ),
            }
          : {})}
      />
      {!noHelpText && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Box>
  );
};

export default CustomInput;

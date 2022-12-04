import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  Stack,
} from '@chakra-ui/react';

import useBookStatus from './hooks/useBookStatus';
import type { BookStatus } from '@/types/book';

const buttonText = {
  0: '想讀',
  1: '閱讀中',
  2: '已完成',
};

type Props = {
  id: string;
  status: BookStatus | null;
  renderButton?: (
    onClick: React.MouseEventHandler<HTMLButtonElement>
  ) => React.ReactNode;
};

const BookStatusDialog = ({ id, status, renderButton }: Props) => {
  const { isOpen, handleOpen, handleClose, handleClick, removeBook } =
    useBookStatus(id, status);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {renderButton ? (
        renderButton(handleOpen)
      ) : (
        <Button onClick={handleOpen}>
          {typeof status === 'number' ? buttonText[status] : '加入書櫃'}
        </Button>
      )}

      <AlertDialog
        leastDestructiveRef={cancelRef}
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>變更閱讀狀態</AlertDialogHeader>
          <AlertDialogCloseButton ref={cancelRef} />
          <AlertDialogBody>
            <Stack spacing="16px">
              <Button
                onClick={handleClick(0)}
                variant={status === 0 ? 'solid' : 'outline'}
              >
                想讀
              </Button>
              <Button
                onClick={handleClick(1)}
                variant={status === 1 ? 'solid' : 'outline'}
              >
                正在閱讀
              </Button>
              <Button
                onClick={handleClick(2)}
                variant={status === 2 ? 'solid' : 'outline'}
              >
                已完成
              </Button>
              {typeof status === 'number' && (
                <Button onClick={removeBook} colorScheme="red" variant="link">
                  移出書櫃
                </Button>
              )}
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookStatusDialog;

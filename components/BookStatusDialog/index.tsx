import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Stack,
} from '@chakra-ui/react';
import CustomButton from '@/components/common/CustomButton';
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
  const {
    isOpen,
    isDeleteOpen,
    handleOpen,
    handleClose,
    handleDeleteOpen,
    handleDeleteClose,
    handleClick,
    removeBook,
  } = useBookStatus(id, status);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {renderButton ? (
        renderButton(handleOpen)
      ) : (
        <CustomButton onClick={handleOpen}>
          {typeof status === 'number' ? buttonText[status] : '加入書櫃'}
        </CustomButton>
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
              <CustomButton
                onClick={handleClick(0)}
                //variant={status === 0 ? 'solid' : 'outline'}
              >
                想讀
              </CustomButton>
              <CustomButton
                onClick={handleClick(1)}
                // variant={status === 1 ? 'solid' : 'outline'}
              >
                正在閱讀
              </CustomButton>
              <CustomButton
                onClick={handleClick(2)}
                //variant={status === 2 ? 'solid' : 'outline'}
              >
                已完成
              </CustomButton>
              {typeof status === 'number' && (
                <CustomButton
                  onClick={handleDeleteOpen}
                  // colorScheme="red"
                  // variant="link"
                >
                  移出書櫃
                </CustomButton>
              )}
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        motionPreset="slideInBottom"
        isOpen={isDeleteOpen}
        onClose={handleDeleteClose}
        isCentered
      >
        {' '}
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              從書櫃中移除
            </AlertDialogHeader>
            <AlertDialogBody>
              將書本移出書櫃將會刪除全部閱讀紀錄，確定繼續?
            </AlertDialogBody>
            <AlertDialogFooter>
              <CustomButton
                ref={cancelRef}
                onClick={handleDeleteClose}
                // variant="outline"
              >
                取消
              </CustomButton>
              <CustomButton onClick={removeBook}>確認刪除</CustomButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default BookStatusDialog;

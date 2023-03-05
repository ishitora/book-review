import React, { useRef } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

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
        <CustomButton
          variant={typeof status === 'number' ? 'contained' : 'outlined'}
          onClick={handleOpen}
        >
          {typeof status === 'number' ? buttonText[status] : '加入書櫃'}
        </CustomButton>
      )}

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>變更閱讀狀態</DialogTitle>
        <DialogContent sx={{ width: '300px' }}>
          <Stack spacing="16px">
            <CustomButton
              onClick={handleClick(0)}
              variant={status === 0 ? 'contained' : 'outlined'}
            >
              想讀
            </CustomButton>
            <CustomButton
              onClick={handleClick(1)}
              variant={status === 1 ? 'contained' : 'outlined'}
            >
              正在閱讀
            </CustomButton>
            <CustomButton
              onClick={handleClick(2)}
              variant={status === 2 ? 'contained' : 'outlined'}
            >
              已完成
            </CustomButton>
            {typeof status === 'number' && (
              <CustomButton
                onClick={handleDeleteOpen}
                error={true}
                variant="outlined"
              >
                移出書櫃
              </CustomButton>
            )}
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>從書櫃中移除</DialogTitle>
        <DialogContent>
          將書本移出書櫃將會刪除全部閱讀紀錄，確定繼續?
        </DialogContent>
        <DialogActions>
          <CustomButton
            ref={cancelRef}
            onClick={handleDeleteClose}
            variant="outlined"
          >
            取消
          </CustomButton>
          <CustomButton error onClick={removeBook}>
            確認刪除
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookStatusDialog;

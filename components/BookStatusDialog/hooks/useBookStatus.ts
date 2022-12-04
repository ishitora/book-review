import { useBoolean } from '@chakra-ui/react';
import useCheckLogin from '@/hooks/useCheckLogin';
import { useAppDispatch } from '@/hooks/redux';
import bookServers from '@/servers/bookServers';

import type { BookStatus } from '@/types/book';

import { changeBookshelf, removeFromBookshelf } from '@/slices/accountSlice';

const useBookStatus = (id: string, status: BookStatus | null) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useBoolean();
  const checkLogin = useCheckLogin();
  const handleOpen = () => {
    if (checkLogin()) {
      setIsOpen.on();
    }
  };

  const handleClick = (newStatus: BookStatus) => (): void => {
    if (status === newStatus) {
      return;
    }
    dispatch(changeBookshelf({ id, newStatus }));
  };

  const removeBook = (): void => {
    dispatch(removeFromBookshelf({ id })).then(() => {
      setIsOpen.off();
    });
  };

  const handleClose = setIsOpen.off;
  return {
    isOpen,
    handleOpen,
    handleClose,
    handleClick,
    removeBook,
  };
};

export default useBookStatus;

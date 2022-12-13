import { useBoolean } from '@chakra-ui/react';
import useCheckLogin from '@/hooks/useCheckLogin';
import { useAppDispatch } from '@/hooks/redux';
import bookServers from '@/servers/bookServers';

import type { BookStatus } from '@/types/book';

import { changeBookshelf, removeFromBookshelf } from '@/slices/accountSlice';

const useBookStatus = (id: string, status: BookStatus | null) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useBoolean();
  const [isDeleteOpen, setIsDeleteOpen] = useBoolean();
  const checkLogin = useCheckLogin();

  const handleOpen = () => {
    if (checkLogin()) {
      setIsOpen.on();
    }
  };

  const handleDeleteOpen = () => {
    setIsOpen.off();
    setIsDeleteOpen.on();
  };

  const handleClick = (newStatus: BookStatus) => (): void => {
    if (status === newStatus) {
      return;
    }
    dispatch(changeBookshelf({ id, newStatus }));
  };

  const removeBook = (): void => {
    dispatch(removeFromBookshelf({ id })).then(() => {
      setIsDeleteOpen.off();
    });
  };

  const handleClose = setIsOpen.off;
  const handleDeleteClose = setIsDeleteOpen.off;

  return {
    isOpen,
    isDeleteOpen,

    handleOpen,
    handleDeleteOpen,
    handleClose,
    handleDeleteClose,
    handleClick,
    removeBook,
  };
};

export default useBookStatus;

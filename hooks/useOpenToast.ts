import { useToast } from '@chakra-ui/react';

const useOpenToast = () => {
  const toast = useToast();

  const openToast = (
    status: 'success' | 'error' = 'success',
    title: string,
    description?: string
  ) => {
    toast({
      title,
      ...(description ? { description } : {}),
      status,
      duration: 3000,
      position: 'bottom-right',
      isClosable: false,
    });
  };
  return openToast;
};

export default useOpenToast;

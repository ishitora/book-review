import React from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useCheckLogin from '@/hooks/useCheckLogin';
import reviewServers from '@/servers/reviewServers';

const useReviewForm = (id: string, afterSubmit: (() => void) | undefined) => {
  const [isOpen, setIsOpen] = useBoolean();
  const checkLogin = useCheckLogin();
  const schema = yup.object({
    rating: yup.number().typeError('請選擇評分'),
    title: yup.string().required('必填'),
    content: yup.string().required('必填'),
  });

  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      rating: null,
      title: '',
      content: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    reviewServers.addReview(id, data).then(() => {
      setIsOpen.off();
      if (typeof afterSubmit === 'function') {
        afterSubmit();
      }
    });
  });

  const handleOpen = () => {
    if (checkLogin()) {
      setIsOpen.on();
    }
  };

  const handleClose = setIsOpen.off;

  return {
    isOpen,
    handleOpen,
    handleClose,
    methods,
    onSubmit,
    control,
    errors,
  };
};

export default useReviewForm;

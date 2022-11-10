import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Rating from '@/components/Ratings/Rating';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useBoolean,
  Textarea,
  Text,
  Box,
} from '@chakra-ui/react';

import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/ErrorMessage';

import reviewServers from '@/servers/reviewServers';

const AddReviewModal = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useBoolean();

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
    reviewServers.addReview(id, data);
  });

  return (
    <>
      <Button onClick={setIsOpen.on}>評論</Button>
      <Modal isOpen={isOpen} onClose={setIsOpen.off}>
        <ModalOverlay />
        <ModalContent>
          <FormProvider {...methods}>
            <ModalHeader>分享您的看法</ModalHeader>
            <ModalCloseButton />
            <ModalBody
              sx={{
                '&>* + *': {
                  marginTop: '16px',
                },
              }}
            >
              <Box>
                <Text>給予評分</Text>
                <Rating name="rating" errorMessage={errors.rating?.message} />
              </Box>
              <Text>留下評論</Text>
              <Box>
                <Text>標題</Text>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value, name } }) => (
                    <Input
                      placeholder="輸入評論標題"
                      errorMessage={errors.title?.message}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      name={name}
                    />
                  )}
                />
              </Box>
              <Box>
                <Text>評論</Text>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Textarea
                      isInvalid={Boolean(errors.content?.message)}
                      {...field}
                      placeholder="輸入您的評論"
                    />
                  )}
                />
                <ErrorMessage>{errors.content?.message}</ErrorMessage>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={setIsOpen.off}>
                取消
              </Button>
              <Button colorScheme="blue" onClick={onSubmit}>
                提交
              </Button>
            </ModalFooter>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddReviewModal;

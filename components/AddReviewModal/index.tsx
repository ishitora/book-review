import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import Rating from '@/components/Ratings/Rating';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Text,
  Box,
} from '@chakra-ui/react';
import CustomButton from '@/components/common/CustomButton';
import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/ErrorMessage';
import useReviewForm from './hooks/useReviewForm';
type AddReviewModalProps = {
  id: string;
  renderButton?: (
    onClick: React.MouseEventHandler<HTMLButtonElement>
  ) => React.ReactNode;
  afterSubmit?: () => void;
};

const AddReviewModal = ({
  id,
  renderButton,
  afterSubmit,
}: AddReviewModalProps) => {
  const {
    isOpen,
    handleOpen,
    handleClose,
    methods,
    onSubmit,
    control,
    errors,
  } = useReviewForm(id, afterSubmit);

  return (
    <>
      {renderButton ? (
        renderButton(handleOpen)
      ) : (
        <CustomButton onClick={handleOpen}>評論</CustomButton>
      )}

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent
          sx={{
            maxWidth: 'min(calc(100vw - 32px),600px)',
          }}
        >
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
              <CustomButton onClick={handleClose}>取消</CustomButton>
              <CustomButton onClick={onSubmit}>提交</CustomButton>
            </ModalFooter>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddReviewModal;

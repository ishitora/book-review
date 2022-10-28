import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import Rating from '@/components/common/Rating';
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
} from '@chakra-ui/react';
type Props = {};

const AddReviewModal = (props: Props) => {
  const [isOpen, setIsOpen] = useBoolean();
  return (
    <>
      <Button onClick={setIsOpen.on}>評論</Button>
      <Modal isOpen={isOpen} onClose={setIsOpen.off}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>分享您的看法</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            給予評分
            <Rating />
            留下評論 標題(INPUT) 評論(INPUT)
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={setIsOpen.off}>
              取消
            </Button>
            <Button variant="ghost">提交</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddReviewModal;

import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import Rating from '@/components/Ratings/Rating';
import CustomButton from '@/components/common/CustomButton';
import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/ErrorMessage';
import useReviewForm from './hooks/useReviewForm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': { width: '100%', maxWidth: '600px' },
        }}
      >
        <DialogContent sx={{}}>
          <FormProvider {...methods}>
            <DialogTitle sx={{ paddingLeft: 0 }}>分享書評</DialogTitle>

            <Box>
              <Typography variant="subtitle1">給予評分</Typography>
              <Rating name="rating" errorMessage={errors.rating?.message} />
            </Box>

            <Box>
              <Typography variant="subtitle1">書評標題</Typography>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <Input
                    fullWidth
                    placeholder="輸入書評標題"
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
              <Typography variant="subtitle1">書評內容</Typography>
              <Controller
                name="content"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    multiline
                    rows={4}
                    error={Boolean(errors.content?.message)}
                    placeholder="輸入書評內容"
                    sx={{ backgroundColor: '#fff' }}
                  />
                )}
              />
              <ErrorMessage>{errors.content?.message}</ErrorMessage>
            </Box>

            <DialogActions>
              <CustomButton variant="outlined" onClick={handleClose}>
                取消
              </CustomButton>
              <CustomButton onClick={onSubmit}>提交</CustomButton>
            </DialogActions>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddReviewModal;

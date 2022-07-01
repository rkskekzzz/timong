import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MySnackbar: React.FC<{
  isCopy: boolean;
  handleCopyFalse: () => void;
}> = ({ isCopy, handleCopyFalse }) => {
  return (
    <div style={{ width: '100%' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isCopy}
        autoHideDuration={2000}
        onClose={handleCopyFalse}
      >
        <Alert
          onClose={handleCopyFalse}
          severity="success"
          sx={{ width: '100%' }}
        >
          복사되었습니다!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MySnackbar;

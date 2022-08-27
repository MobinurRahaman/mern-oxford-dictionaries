import { Backdrop, CircularProgress } from '@material-ui/core';

export default function BackdropComponent({ isLoading }) {
  return (
    <Backdrop
      sx={{ color: "#fff", backgroundColor: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
      onClick={() => {}}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

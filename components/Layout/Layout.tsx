import { forwardRef, ReactChild, useContext } from 'react';
import { Container, LinearProgress, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import NavBar from './NavBar';
import { UXContext } from '../../providers/UXProvider';

interface ILayoutProps {
  children: ReactChild;
}

const Layout: (props: ILayoutProps) => JSX.Element = (props: ILayoutProps) => {
  const { isLoading, notification, setNotification } = useContext(UXContext);

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Snackbar
        autoHideDuration={5000}
        open={notification !== null}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {notification ? (
          <Alert onClose={() => setNotification(null)} severity={notification.type}>
            {notification.message}
          </Alert>
        ) : undefined}
      </Snackbar>
      <NavBar />
      {isLoading && <LinearProgress color="secondary" />}
      <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
        {props.children}
      </Container>
    </>
  );
};

export default Layout;

import { forwardRef, ReactChild, useContext, useEffect } from 'react';
import { Container, LinearProgress, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import NavBar from './NavBar';
import { UXContext } from '../../providers/UXProvider';
import { useRouter } from 'next/router';

interface ILayoutProps {
  children: ReactChild;
}

const Layout: (props: ILayoutProps) => JSX.Element = (props: ILayoutProps) => {
  const { isLoading, setIsLoading, notification, setNotification } = useContext(UXContext);

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
    return () => {
      router.events.off('routeChangeComplete', () => {
        console.log('stopped');
      });
    };
  }, [router.events]);

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
      <div style={{ height: '4px' }}>{isLoading && <LinearProgress color="secondary" />}</div>

      <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
        {props.children}
      </Container>
    </>
  );
};

export default Layout;

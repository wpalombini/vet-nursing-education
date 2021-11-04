import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, Fragment, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import LayoutComponent from '../components/Layout/LayoutComponent';
import { UXProvider } from '../providers/UXProvider';

const VNEApp: FC<any> = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Vet Nursing Education</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UXProvider>
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </UXProvider>
      </ThemeProvider>
    </Fragment>
  );
};
export default VNEApp;

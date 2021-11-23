import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../styles/theme';
import Layout from '../components/Layout/Layout';
import { UXProvider } from '../providers/UXProvider';
import { BreadCrumbs } from '../components/Layout/BreadCrumbs';

const VNEApp: ({ Component, pageProps }: AppProps) => JSX.Element = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Vet Nursing Education</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UXProvider>
          <Layout>
            <BreadCrumbs />
            <Component {...pageProps} />
          </Layout>
        </UXProvider>
      </ThemeProvider>
    </>
  );
};
export default VNEApp;

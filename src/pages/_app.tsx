import '../styles/globals.css';
import Head from 'next/head';

import { ErrorBoundary } from 'ui';

import { fontLinks } from 'constants/fontLinks';

import type { AppProps, NextWebVitalsMetric } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        {fontLinks.map((props, index) => (
          <link key={index} {...props} />
        ))}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
  const IS_WEB_VITALS_ENABLE = process.env.NEXT_PUBLIC_WEB_VITALS === 'true';

  if (IS_WEB_VITALS_ENABLE) {
    console.log(metric);
  }
};

export default function App(props: AppProps) {
  return (
    <ErrorBoundary>
      <MyApp {...props} />
    </ErrorBoundary>
  );
}

import React from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <NextNProgress
        color="#014747"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp

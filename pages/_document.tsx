import { ColorModeScript } from '@chakra-ui/react'

import { Html, Head, Main, NextScript } from 'next/document'

import Script from 'next/script'


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G1PBK2DRKW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-G1PBK2DRKW');
          `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

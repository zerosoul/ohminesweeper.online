import Script from "next/script";
import React from "react";

type Props = {};
const AdSense = ({}: Props) => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.PUBLIC_NEXT_AD_SENSE_PID}`}
      // strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
};

export default AdSense;

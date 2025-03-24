// "use client";
import Script from "next/script";
// import React, { useEffect } from "react";

type Props = {};

const AdBlock = ({}: Props) => {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.PUBLIC_NEXT_AD_SENSE_PID}`}
        // strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.PUBLIC_NEXT_AD_SENSE_PID}
        data-ad-slot="4159558668"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <Script id="my-script">{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
    </>
  );
};

export default AdBlock;

"use client";
import Script from "next/script";

function GTag() {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID});
    `}
      </Script>
    </>
  );
}

export default GTag;

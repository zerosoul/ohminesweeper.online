import React from "react";
import Script from "next/script";

type Props = {};

const PlausibleCode = ({}: Props) => {
  return (
    <>
      <Script
        defer
        data-domain="ohminesweeper.online"
        src="https://a.ihacker.dev/js/script.file-downloads.hash.outbound-links.js"
      />
      <Script strategy="afterInteractive" id="plausible">
        {`
       window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
      `}
      </Script>
    </>
  );
};

export default PlausibleCode;

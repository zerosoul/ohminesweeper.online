"use client";
import React, { useEffect } from "react";

type Props = {};

const AdBlock = ({}: Props) => {
  useEffect(() => {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={process.env.PUBLIC_NEXT_AD_SENSE_PID}
      data-ad-slot="4159558668"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdBlock;

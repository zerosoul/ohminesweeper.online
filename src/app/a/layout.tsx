// import React from "react";
import Navs from "./_navs";
// import { headers } from "next/headers";
type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  // const h = headers().get("x-next-pathname");
  // console.log(h);

  return (
    <>
      <Navs />
      <article className=" article">{children}</article>
      <Navs />
    </>
  );
};

export default Layout;

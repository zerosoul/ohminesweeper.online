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
    <section className="w-full h-full bg-[silver] flex flex-col justify-between items-center">
      <Navs />
      <article className="article flex-1">{children}</article>
      <Navs />
    </section>
  );
};

export default Layout;

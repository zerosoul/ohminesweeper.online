import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <article className=" article">{children}</article>;
};

export default Layout;

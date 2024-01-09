import Link from "next/link";
import React from "react";

// type Props = {};

const NotFound = () => {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <h2 className="font-semibold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </main>
  );
};

export default NotFound;

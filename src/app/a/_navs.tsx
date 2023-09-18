import { Pages } from "@/config";
import Link from "next/link";
import React from "react";

// type Props = {}

const Navs = () => {
  const paths: {
    path: string;
    title: string;
  }[] = Pages.map(({ url, title }) => {
    const path = new URL(url).pathname;
    return {
      path,
      title
    };
  });
  return (
    <nav className="my-6">
      <ul className="flex flex-wrap justify-center">
        {paths.map(({ path, title }) => {
          return (
            <li key={path} data-path={path} className="m-2">
              <button className="!p-0">
                <Link className="px-2 text-inherit block w-full h-full" href={path}>
                  {path == "/" ? `<< Back to Home` : title}
                </Link>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navs;

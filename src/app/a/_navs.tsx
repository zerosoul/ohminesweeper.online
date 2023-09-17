import Link from "next/link";
import React from "react";

// type Props = {}

const Navs = () => {
  const paths: {
    path: string;
    title: string;
  }[] = [
    {
      path: "/a/how-to-play",
      title: "How To Play Minesweeper"
    },
    {
      path: "/a/advance-patterns",
      title: "Advance Patterns"
    },
    {
      path: "/a/first-click",
      title: "First Click"
    },
    {
      path: "/a/guess",
      title: "Guessing"
    },
    {
      path: "/a/no-flag",
      title: "No Flags"
    },
    {
      path: "/a/efficiency",
      title: "Efficiency"
    },
    {
      path: "/a/more-tips",
      title: "More Tips"
    }
  ];
  return (
    <nav>
      <ul className="flex flex-wrap justify-center">
        <li className="m-2">
          <button className="!p-0">
            <Link className="px-2 text-inherit block w-full h-full" href={"/"}>
              {`<<  Back Home`}
            </Link>{" "}
          </button>
        </li>
        {paths.map(({ path, title }) => {
          return (
            <li key={path} className="m-2">
              <button className="!p-0">
                <Link className="px-2 text-inherit block w-full h-full" href={path}>
                  {title}
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

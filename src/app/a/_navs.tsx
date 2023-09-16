import Link from "next/link";
import React from "react";

// type Props = {}

const Navs = () => {
  const paths: {
    path: string;
    title: string;
  }[] = [
    {
      path: "/a/guess",
      title: "Guessing"
    },
    {
      path: "/a/efficiency",
      title: "Efficiency"
    },
    {
      path: "/a/no-flags",
      title: "No Flags"
    },
    {
      path: "/a/more-tips",
      title: "More Tips"
    },
    {
      path: "/a/advance-patterns",
      title: "Advance Patterns"
    },
    {
      path: "/a/how-to",
      title: "How To Play Minesweeper"
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

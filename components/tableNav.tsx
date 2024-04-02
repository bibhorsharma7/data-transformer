import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Dropdown from "./dropdown";
export type navArgument = "first" | "prev" | "next" | "last";

interface tableNavProps {
  start: number;
  nitems: number;
  total: number;
  handleNav: (_: navArgument) => void;
  setNitems: Dispatch<SetStateAction<number>>;
}

const TableNav = (props: tableNavProps) => {
  const start = props.start;
  const nitems = props.nitems;
  const total = props.total;
  const setNitems = props.setNitems;
  const handleNav = props.handleNav;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let n = parseInt(e.target.value);
    if (n == null || n == undefined || Number.isNaN(n)) n = 0;
    if (n >= 0 && n <= 100) setNitems(n);
  };

  return (
    <div className="flex w-full flex-row justify-between p-4">
      <div className="my-auto text-xs">
        <span>
          Showing {start} - {start + nitems}{" "}
          <Dropdown
            items={[15, 50, 100]}
            selected={nitems}
            handleSelect={(n) => setNitems(n)}
          />{" "}
          of {total}
        </span>
      </div>
      <div className="inline-flex h-8 -space-x-px text-sm">
        <span
          onClick={() => handleNav("first")}
          className="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {/* First */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span
          onClick={() => handleNav("prev")}
          className="ml-0 flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {/* Previous */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span
          onClick={() => handleNav("next")}
          className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {/* Next */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <span
          onClick={() => handleNav("last")}
          className="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {/* last */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default TableNav;

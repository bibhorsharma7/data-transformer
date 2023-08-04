import { columns } from "@/app/constants";
import Papa, { ParseResult } from "papaparse";
import { useEffect, useState } from "react";

const Table = ({ file }: { file: File | null }) => {
  const [data, setData] = useState<string[][]>([]);
  const [nitems, setNitems] = useState(15);
  const [start, setStart] = useState(1);

  useEffect(() => {
    setData([]);
    if (!file) return;

    Papa.parse(file, {
      chunk: (result: ParseResult<string[]>) => {
        if (result.data) {
          setData([...data, ...result.data]);
        }
      },
      complete: () => {
        console.log("Parsing complete");
      },
    });
  }, [file]);

  useEffect(() => {
    console.log("Fields: ", data[0]);
    console.log("data count: ", data.length);
  }, [data]);

  const handlePrev = () => {
    const nstart = Math.max(1, start - nitems);
    setStart(nstart);
  };

  const handleNext = () => {
    const nstart = Math.min(data.length - nitems, start + nitems);
    setStart(nstart);
  };

  return (
    data.length > 0 && (
      <div className="border-1 w-full rounded border-gray-700 shadow-md">
        <table className="h-full w-full table-auto">
          <thead className="h-10 bg-gray-50 text-left text-xs">
            <tr>
              {data[0].map((colName) => (
                <th key={colName}>{colName}</th>
              ))}
            </tr>
          </thead>
          <tbody className="max-h-screen overflow-y-scroll text-xs ">
            {data.slice(start, start + nitems).map((row) => (
              <tr className="h-10 border-b" key={row[0]}>
                {row.map((cell, idx) => (
                  <td key={idx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex w-full flex-row justify-between p-4">
          <div className="my-auto text-xs">
            <span>
              Showing {start} - {start + nitems} of {data.length}
            </span>
          </div>
          <div className="inline-flex h-8 -space-x-px text-sm">
            <span
              onClick={() => setStart(1)}
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
              onClick={() => handlePrev()}
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
              onClick={() => handleNext()}
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
              onClick={() => setStart(data.length - nitems)}
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
      </div>
    )
  );
};

export default Table;

// <li>
//   <a
//     href="#"
//     className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//   >
//     1
//   </a>
// </li>
// <li>
//   <a
//     href="#"
//     className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//   >
//     2
//   </a>
// </li>
// <li>
//   <a
//     href="#"
//     aria-current="page"
//     className="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
//   >
//     3
//   </a>
// </li>

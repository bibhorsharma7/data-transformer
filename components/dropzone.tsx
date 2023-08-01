"use client";

import Image from "next/image";
import { useState } from "react";

const Dropzone = () => {
  const [file, setFile] = useState(null);
  // const [file, setFile] = useState("test.jpg");

  return (
    <div className="flex h-52 w-full flex-col items-center rounded-lg border-2 border-dashed border-gray-500 p-4">
      <label
        htmlFor="file-input"
        className="space-between flex h-full w-full flex-col items-center justify-center hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>

        <p className="pt-2 text-sm">Select or drag/drop file here</p>
        <input className="hidden" type="file" id="file-input" />
        {file && (
          <div className="mt-10 flex rounded-md border-2 border-solid border-black px-5 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
              />
            </svg>
            <p className="mx-2">{file}</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default Dropzone;

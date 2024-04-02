import { useState } from "react";

interface dropdownProps {
  items: number[];
  selected: number;
  handleSelect: (_: number) => void;
}

const Dropdown = (props: dropdownProps) => {
  const { items, selected, handleSelect } = props;

  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-flex">
      <div
        onClick={() => setShow(!show)}
        className="flex w-6 flex-row items-center rounded bg-blue-700 text-center text-sm text-white hover:cursor-pointer hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {selected}{" "}
        {/* <svg
          className="ml-2.5 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg> */}
      </div>
      {/* Dropdown menu */}
      {show && (
        <div className="top-2 z-10 w-14 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {items.map((item) => {
              return (
                <li key={item}>
                  <span
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      handleSelect(item);
                      setShow(false);
                    }}
                  >
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

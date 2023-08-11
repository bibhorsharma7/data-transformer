import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "./button";
import Papa from "papaparse";

interface ModalProps {
  data: string[][];
  columns: string[];
  mapping: Map<string, string>;
  selectedCols: boolean[];
  setShow: Dispatch<SetStateAction<boolean>>;
}

const Modal = (props: ModalProps) => {
  const data = props.data;
  const columns = props.columns;
  const mapping = props.mapping;
  const selectedCols = props.selectedCols;
  const setShow = props.setShow;

  const [selCols, setSelcols] = useState<string[]>([]);

  useEffect(() => {
    let tmp = [];
    for (let i = 0; i < columns.length; i++) {
      if (selectedCols[i]) tmp.push(columns[i]);
    }
    setSelcols(tmp);
  }, []);

  const handleSubmit = () => {
    const ndata = data.map((row) => {
      const nrow = row.filter((_, index) => selectedCols[index]);
      return nrow;
    });

    const colNames: string[] = selCols.map((name) => {
      if (mapping.has(name)) return mapping.get(name)!;

      return name;
    });

    const csv = Papa.unparse(ndata, {
      columns: colNames,
    });
    const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file.csv");
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <div className="justify-cente absolute left-0 top-0 z-10 m-0 flex h-full w-full flex-col items-center justify-center backdrop-blur-md">
      <div className="flex h-1/2 w-1/2 flex-col rounded-md bg-white px-2 py-2">
        <div className="mb-2 flex h-10 w-full flex-row items-center border-b-2 text-lg">
          <h1 className="flex-1">Overview</h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShow(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-red-500"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 px-2">
          <h2>Selected Columns</h2>
          <div className="mb-4 flex flex-col">
            {selCols.map((colName) => (
              <span key={colName}>{colName}</span>
            ))}
          </div>
          <h2>Renamed Columns</h2>
          {selCols.map(
            (colName) =>
              mapping.has(colName) && (
                <div key={colName} className="flex flex-row">
                  <span>{colName}</span>
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
                      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{mapping.get(colName)}</span>
                </div>
              ),
          )}
        </div>
        <Button text="Confirm" handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Modal;

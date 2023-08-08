import { defaultNitems } from "@/app/constants";
import Papa, { ParseResult } from "papaparse";
import { useEffect, useRef, useState } from "react";
import TableNav, { navArgument } from "./tableNav";

interface tableProps {
  file: File | null;
}

const Table = (props: tableProps) => {
  const file = props.file;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[][]>([]);
  const [nitems, setNitems] = useState(defaultNitems);
  const [start, setStart] = useState(1);
  const tableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setData([]);
    setStart(1);
    setLoading(true);

    if (!file) return;

    Papa.parse(file, {
      worker: true,
      skipEmptyLines: true,
      // chunk: (result: ParseResult<string[]>) => {
      //   if (result.data) {
      //     const ndata = data.concat(result.data);
      //     setData(ndata);
      //   }
      // },
      complete: (result: ParseResult<string[]>) => {
        setData(result.data);
        setLoading(false);
        console.log("Parsing complete");
      },
    });
  }, [file]);

  useEffect(() => {
    console.log("Fields: ", data[0]);
    console.log("data count: ", data.length);
  }, [data]);

  const handleNav = (type: navArgument) => {
    let nstart = 1;
    switch (type) {
      case "prev":
        nstart = Math.max(1, start - nitems);
        break;
      case "next":
        nstart = Math.min(data.length - nitems, start + nitems);
        break;
      case "last":
        nstart = data.length - nitems;
    }
    setStart(nstart);
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    data.length > 0 && (
      <div
        ref={tableRef}
        className="border-1 w-full rounded border-gray-700 shadow-md"
      >
        <TableNav
          start={start}
          nitems={nitems}
          total={data.length}
          handleNav={handleNav}
        />
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
        <TableNav
          start={start}
          nitems={nitems}
          total={data.length}
          handleNav={handleNav}
        />
      </div>
    )
  );
};

export default Table;

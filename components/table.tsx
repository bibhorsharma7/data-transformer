import { defaultNitems } from "@/app/constants";
import Papa, { ParseResult } from "papaparse";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import TableNav, { navArgument } from "./tableNav";
import Loading from "./loading";
import { COMPILER_NAMES } from "next/dist/shared/lib/constants";
import Checkbox from "./checkbox";

interface tableProps {
  file: File | null;
  data: string[][];
  columns: string[];
  selected: boolean[];
  colMapping: Map<string, string>;
  setData: Dispatch<SetStateAction<string[][]>>;
  setColumns: Dispatch<SetStateAction<string[]>>;
  setSelected: Dispatch<SetStateAction<boolean[]>>;
  setColMapping: Dispatch<SetStateAction<Map<string, string>>>;
}

const Table = (props: tableProps) => {
  const file = props.file;
  const [loading, setLoading] = useState(false);
  const [nitems, setNitems] = useState(defaultNitems);
  const [start, setStart] = useState(0);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const data = props.data;
  const setData = props.setData;
  const cols = props.columns;
  const setCols = props.setColumns;
  const selected = props.selected;
  const setSelected = props.setSelected;
  const colMapping = props.colMapping;
  const setColMapping = props.setColMapping;

  useEffect(() => {
    setData([]);
    setCols([]);
    setStart(0);

    if (!file) return;

    setLoading(true);
    Papa.parse(file, {
      worker: true,
      header: true,
      skipEmptyLines: true,
      // preview: 1000,
      chunk: (result: ParseResult<string[]>) => {
        // result.data = [{col: val, col: val, ...}, {}, {}]
        if (cols.length == 0) {
          const columns = Object.keys(result.data[0]);
          setCols(columns);
        }
        const tmp = result.data.map((obj) => {
          return Object.values(obj);
        });
        const ndata = data.concat(tmp);
        setData(ndata);
      },
      complete: () => {
        setLoading(false);
        console.log("Parsing complete");
      },
    });
  }, [file]);

  useEffect(() => {
    const arr: boolean[] = new Array(cols.length).fill(false);
    setSelected(arr);
  }, [cols]);

  const handleNav = (type: navArgument) => {
    let nstart = 0;
    switch (type) {
      case "prev":
        nstart = Math.max(0, start - nitems);
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

  const handleMap = (oldName: string, newName: string) => {
    if (newName.length == 0) {
      colMapping.delete(oldName);
    }
    const newMapping = new Map(colMapping).set(oldName, newName);
    setColMapping(newMapping);
  };

  return (
    <>
      {loading && <Loading />}
      {data.length > 0 && (
        <div
          ref={tableRef}
          className="border-1 w-full rounded border-gray-700 shadow-md"
        >
          <TableNav
            start={start}
            nitems={nitems}
            total={data.length}
            setNitems={setNitems}
            handleNav={handleNav}
          />
          <table className="h-full w-full table-auto">
            <thead className="h-10 bg-gray-50 text-left text-xs">
              <tr>
                {cols.map((colName, idx) => (
                  <th key={colName + idx} className="border border-black">
                    <input
                      className="w-full"
                      type="text"
                      placeholder="Map this column to"
                      onChange={(e) => handleMap(colName, e.target.value)}
                    ></input>
                  </th>
                ))}
              </tr>
              <tr className="h-8">
                {cols.map((colName, idx) => (
                  <th
                    className="px-4 hover:cursor-pointer"
                    key={colName}
                    onClick={() => {
                      const newArr = selected.map((item, index) => {
                        if (index == idx) {
                          return !selected[index];
                        }
                        return selected[index];
                      });
                      setSelected(newArr);
                    }}
                  >
                    <Checkbox selected={selected[idx]} value={colName} />
                    <span>{colName}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="max-h-screen overflow-y-scroll text-xs ">
              {data.slice(start, start + nitems).map((row, idx) => (
                <tr className="h-10 border-b" key={idx + row[0]}>
                  {row.map((cell, idx) => (
                    <td className="border-r px-4" key={idx}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <TableNav
            start={start}
            nitems={nitems}
            total={data.length}
            setNitems={setNitems}
            handleNav={handleNav}
          />
        </div>
      )}
    </>
  );
};

export default Table;

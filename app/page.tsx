import 

import { useState } from "react";
import Modal from "@/components/modal";
import Table from "@/components/table";
import Button from "@/components/button";
import Dropzone from "@/components/dropzone";

export default function App() {



  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<string[][]>([]);
  const [selected, setSelected] = useState<boolean[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [colMapping, setColMapping] = useState<Map<string, string>>(new Map());
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (file != null) {
      setShowModal(true);
      scrollTo(0, 0);
    }
  };

  const calculateNPV = async () => {
    const body = {
      inflow: data.map((row) => row[0]),
      outflow: data.map((row) => row[1]),
      discount: data.map((row) => row[2]),
    };

    const rawResp = await fetch("http://localhost:3000/api/npv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await rawResp.json();
    console.log("response: ", response);
    alert("Net Present Value: " + response.net_present_value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-normal p-24">
      <div className="flex w-full flex-col items-center space-y-4">
        <
        <Dropzone file={file} setFile={setFile} />
        <Table
          file={file}
          data={data}
          setData={setData}
          selected={selected}
          columns={columns}
          setColumns={setColumns}
          setSelected={setSelected}
          colMapping={colMapping}
          setColMapping={setColMapping}
        />
        <Button
          text="Submit"
          handleSubmit={handleSubmit}
          disabled={file == null ? true : false}
        />
        <Button
          text="Calculate NPV"
          handleSubmit={calculateNPV}
          disabled={file == null ? true : false}
        />
        {showModal && (
          <Modal
            data={data}
            columns={columns}
            mapping={colMapping}
            selectedCols={selected}
            setShow={setShowModal}
          />
        )}
      </div>
    </main>
  );
}

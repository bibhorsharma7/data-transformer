"use client";

import Button from "@/components/button";
import Dropzone from "@/components/dropzone";
import Modal from "@/components/modal";
import Table from "@/components/table";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<string[][]>([]);
  const [selected, setSelected] = useState<boolean[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [colMapping, setColMapping] = useState<Map<string, string>>(new Map());
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = async () => {
    setShowModal(true);
    scrollTo(0, 0);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-normal p-24">
      <div className="flex w-full flex-col items-center space-y-4">
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
        <Button text="Submit" handleSubmit={handleSubmit} />
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

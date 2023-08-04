"use client";

import Button from "@/components/button";
import Dropzone from "@/components/dropzone";
import Table from "@/components/table";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-normal p-24">
      <div className="flex w-full flex-col items-center space-y-4">
        <Dropzone file={file} setFile={setFile} />
        <Table file={file} />
        <Button file={file} />
      </div>
    </main>
  );
}

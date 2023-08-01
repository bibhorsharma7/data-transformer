import Button from "@/components/button";
import Dropzone from "@/components/dropzone";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-normal p-24">
      <div className="flex w-full flex-col items-center space-y-4">
        <Dropzone />
        <Button />
      </div>
    </main>
  );
}

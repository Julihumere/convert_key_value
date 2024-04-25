"use client";
import Image from "next/image";
import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [input, setInput] = useState("");

  const [result, setResult] = useState("");

  const notify = () => {
    if (result === "") {
      toast.error("No hay texto para copiar");
    } else {
      navigator.clipboard.writeText(result);
      toast.success("Texto copiado al portapapeles");
    }
  };

  let convertir = (e: string) => {
    let convert = e
      .replace(/{/g, "")
      .replace(/}/g, "")
      .replace(/,/g, "")
      .replace(/ /g, "")
      .replace(/"/g, "")
      .trim();

    setResult(convert);
    console.log(convert);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div>
        <h1 className="text-5xl">Convertir a formato Key:Value</h1>
      </div>
      <div className="w-full min-h-[60vh] justify-around flex">
        <textarea
          className="w-[600px] min-h-full p-4 border-2 border-gray-300 rounded-lg text-black"
          placeholder="Ingresa tu codigo en formato JSON"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></textarea>

        <div className="relative">
          <textarea
            className="w-[600px] min-h-full p-4 border-2 border-gray-300 rounded-lg  text-black"
            placeholder="Aqui se mostrara el resultado en formato Key:Value"
            value={result}
            readOnly
          ></textarea>
          <button
            onClick={() => notify()}
            className="bg-slate-800  rounded-md z-10 absolute bottom-4 right-4 px-3 py-3 text-3xl"
          >
            📋
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => convertir(input)}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Convertir
      </button>
    </main>
  );
}

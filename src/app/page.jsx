"use client";
import Image from "next/image";
import { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [input, setInput] = useState("");

  const [result, setResult] = useState();

  const notify = () => {
    if (result === "") {
      toast.error("No hay texto para copiar");
    } else {
      navigator.clipboard.writeText(result);
      toast.success("Texto copiado al portapapeles");
    }
  };

  let convertir = (e) => {
    console.log(e);
    const regex = /\["([^"]+)",\s*("[^"]+"|\d+|null)\]/g;

    // Objeto para almacenar los resultados
    const objeto = {};

    let nuevaCadena = "";

    // Iterar sobre los resultados de la expresión regular
    let match;
    while ((match = regex.exec(e)) !== null) {
      const clave = match[1];
      let valor = match[2];

      // Convertir valores numéricos de cadena a números
      if (!isNaN(valor) && valor !== "null") {
        valor = parseInt(valor);
      } else if (valor === "null") {
        valor = null;
      } else {
        valor = valor.replace(/"/g, ""); // Eliminar comillas dobles de los valores de cadena
      }

      console.log(valor);

      objeto[clave] = valor;
    }

    for (const [clave, valor] of Object.entries(objeto)) {
      nuevaCadena += `${clave}:${valor}\n`;
      console.log(`${clave}:${valor}`);
    }

    console.log(nuevaCadena);

    setResult(nuevaCadena);
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

import axios from "axios";
import { useEffect, useState } from "react";
import TituloGenerico from "../Utils/TituloGenerico";
import css from '../Utils/custom.module.css';
import CrearGenero from "./CrearGenero";
import { genero, generoDTO } from "./Generos.model";
import ListadoGeneros from "./ListadoGeneros";

export default function IndexGeneros() {

  const [open, setOpen] = useState(false);
  const [generos, setGeneros] = useState<genero[]>([]);

  const cargarGeneros = async () => {
    const data = await axios.get<genero[]>(`${import.meta.env.VITE_API_URL}/generos/GetGeneros`);
    setGeneros(data.data)
  }

  useEffect(() => {
    cargarGeneros();
  }, [])

  const accion = () => {
    setOpen(true);
  }

  return (
    <>
      <TituloGenerico titulo="Género" accion={accion} buttonText="Crear Género" />

      <CrearGenero open={open} setOpen={setOpen} generos={generos} setGeneros={setGeneros} />

      <div className="p-3">
        <div className={`${css.containerWhite}`}>
          <ListadoGeneros generos={generos} setGeneros={setGeneros} />
        </div>
      </div>
    </>

  );
}

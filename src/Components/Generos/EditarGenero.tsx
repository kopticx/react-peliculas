import { useParams } from "react-router-dom";
import FormularioEditarGenero from "./FormularioEditarGenero";
import { useEffect, useState } from "react";
import axios from "axios";
import { genero } from "./Generos.model";

export default function EditarGenero() {

  const params = useParams();
  const [genero, setGenero] = useState<genero>();

  const cargarGenero = async () => {
    const data = await axios.get<genero>(`${import.meta.env.VITE_API_URL}/generos/GetGenero/${params.id}`);
    
    setGenero(data.data)
  }

  useEffect(() => {
    cargarGenero();
  }, [])

  return (
    <>
    {genero ? <FormularioEditarGenero genero={genero} /> : <></>}
    </>
  );
}

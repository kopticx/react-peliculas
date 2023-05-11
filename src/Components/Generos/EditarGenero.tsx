import { useNavigate, useParams } from "react-router-dom";
import FormularioEditarGenero from "./FormularioEditarGenero";
import { useEffect, useState } from "react";
import axios from "axios";
import { genero } from "./Generos.model";
import TituloGenerico from "../Utils/TituloGenerico";

export default function EditarGenero() {

  const navigate = useNavigate();
  const params = useParams();
  const [genero, setGenero] = useState<genero>();

  const cargarGenero = async () => {
    const data = await axios.get<genero>(`${import.meta.env.VITE_API_URL}/generos/GetGenero/${params.id}`);
    
    setGenero(data.data)
  }

  useEffect(() => {
    cargarGenero();
  }, [])

  const accion = () => {
    navigate(-1);
  };

  return (
    <>
      <TituloGenerico titulo="Editar Género" buttonText="Volver" accion={accion}/>
      {genero ? <FormularioEditarGenero genero={genero} /> : <></>}
    </>
  );
}

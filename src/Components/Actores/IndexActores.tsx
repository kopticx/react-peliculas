import { useNavigate } from "react-router-dom";
import TituloGenerico from "../Utils/TituloGenerico";
import { useEffect, useState } from "react";
import { actorDTO } from "./Actores.model";
import axios from "axios";
import { notificacionError } from "../Utils/Notificaciones";
import ActorIndividual from "./ActorIndividual";
import ListadoActores from "./ListadoActores";

export default function IndexActores() {

  const [actores, setActores] = useState<actorDTO[]>();
  
  const navigate = useNavigate();

  const obtenerActores = async () => {
    await axios.get<actorDTO[]>(`${import.meta.env.VITE_API_URL}/actores/getActores`)
          .then((response) => setActores(response.data))
          .catch(() => notificacionError({message: "Error al obtener los actores", description: "Hubo un error al obtener los actores."}));
  }

  useEffect(() => {
    obtenerActores();
  }, [])

  const accion = () => {
    navigate('crear');
  }
  
  return (
    <>
      <TituloGenerico titulo="Index Actores" accion={accion} buttonText="Crear Actor" />

      {
        actores && <ListadoActores actores={actores} />
      }
    </>
  );
}

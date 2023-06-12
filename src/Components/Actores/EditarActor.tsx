import { useNavigate, useParams } from "react-router-dom";
import { actorDTO, actoresFormularioDTO } from "./Actores.model";
import TituloGenerico from "../Utils/TituloGenerico";
import FormularioActores from "./FormularioActores";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { notificacionError, notificacionSuccess } from "../Utils/Notificaciones";
import { actorToFormData } from "./ActorUtils";
import { useAppDispatch } from "../../redux/hooks/useTypedSelectors";

export default function EditarActor() {

  const [actor, setActor] = useState<actorDTO>();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const params = useParams();

  const obtenerActor = async () => {
    await axios.get<actorDTO>(`${import.meta.env.VITE_API_URL}/actores/getActor/${params.id}`)
      .then((response) => 
            { 
              response.data = {...response.data, fechaNacimiento: dayjs(response.data.fechaNacimiento)}; 
              setActor(response.data) 
            })
      .catch(() => notificacionError({message: "Error al obtener el actor", description: "Hubo un error al obtener el actor."}));
  }

  useEffect(() => {
    obtenerActor();
  })

  const onFinish = async (values: any) => {
    values = {
      ...values,
      foto: values.foto?.[0].originFileObj  
    }

    const data = actorToFormData(values);

    await axios({
      method: 'put',
      url: `${import.meta.env.VITE_API_URL}/actores/putActor/${params.id}`,
      data,
      headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(() => {
      notificacionSuccess({message: "Actor editador", description: "El actor se edito correctamente."});
      navigate('/actores');
    })
    .catch((error) => {
      console.log(error);
      notificacionError({message: "Error al editar el actor", description: "Hubo un error al editar el actor."})
    });
  };

  const accion = () => {
    navigate(-1);
  }

  return (
    <>
    {
      actor ? 
      <>
        <TituloGenerico titulo="Editar Actor" accion={accion} buttonText="Volver" />

        <div className="div-center">
          <FormularioActores modelo={actor} onFinish={onFinish} buttonName="Editar" />
        </div>
      </>
      : 
      <></>
    }
      
    </>
  );
}

import { useNavigate } from "react-router-dom";
import TituloGenerico from "../Utils/TituloGenerico";
import FormularioActores from "./FormularioActores";
import axios from "axios";
import { notificacionError, notificacionSuccess } from "../Utils/Notificaciones";
import { actorToFormData } from "./ActorUtils";

export default function CrearActor() {

  const navigate = useNavigate();

  const onFinish = async (values: any) => {

    values = {
      ...values,
      foto: values.foto?.[0].originFileObj  
    }

    const data = actorToFormData(values);

    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_URL}/actores/postActor`,
      data,
      headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(() => {
      notificacionSuccess({message: "Actor creado", description: "El actor se creó correctamente."});
      navigate(-1);
    })
    .catch(() => notificacionError({message: "Error al crear el actor", description: "Hubo un error al crear el actor."}));
  };

  const accion = () => {
    navigate(-1);
  }
  
  return (

    <>
      <TituloGenerico titulo="Crear Actor" accion={accion} buttonText="Volver" />

      <div className="div-center">
        <FormularioActores onFinish={onFinish} buttonName="Crear" />
      </div>
    </>

  );
}

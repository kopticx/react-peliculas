import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notificacionError, notificacionSuccess } from "../Utils/Notificaciones";
import TituloGenerico from "../Utils/TituloGenerico";
import { crearObjetoPOSTCine } from "./CinesUtils";
import FormularioCines from "./FormularioCines";

export default function CrearCine() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const objeto = crearObjetoPOSTCine(values);

    await axios.post(`${import.meta.env.VITE_API_URL}/cines/postCine`, objeto)
      .then(() => {
        notificacionSuccess({ message: "Cine creado con éxito", description: "El cine se ha creado correctamente." });
        navigate("/cines")
      })
      .catch(() => {
        notificacionError({ message: "Error", description: "Ha ocurrido un error al crear el cine." });
      })
  };

  const accion = () => {
    navigate(-1);
  };

  return (
    <>
      <TituloGenerico titulo="Crear Cine" accion={accion} buttonText="Volver" />

      <div className="div-center">
        <FormularioCines onFinish={onFinish} buttonName="Crear" />
      </div>
    </>
  );
}

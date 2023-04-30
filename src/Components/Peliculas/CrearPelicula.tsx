import { useNavigate } from "react-router-dom";
import FormularioPeliculas from "./FormularioPeliculas";
import TituloGenerico from "../Utils/TituloGenerico";

export default function CrearPelicula() {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
      console.log("Success:", values);
    };
  
    const accion = () => {
      navigate(-1);
    }

  return (
    <>
      <TituloGenerico titulo="Crear Pelicula" accion={accion} buttonText="Volver" />

      <div className="div-center">
        <FormularioPeliculas onFinish={onFinish} buttonName="Crear" />
      </div>
    </>
  );
}

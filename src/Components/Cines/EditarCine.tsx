import { useNavigate } from "react-router-dom";
import { cinesFormularioDTO } from "./Cines.model";
import { Marker } from "mapbox-gl";
import TituloGenerico from "../Utils/TituloGenerico";
import FormularioCines from "./FormularioCines";

export default function EditarCine() {
    const navigate = useNavigate();

  const onFinish = (values: cinesFormularioDTO) => {
    console.log("Creando:", values);
  };

  const accion = () => {
    navigate(-1);
  };

  const modelo: cinesFormularioDTO = {
    nombre: "Cinepolis",
    ubicacion: new Marker().setLngLat([-99.13199, 19.43620]),
  }

  return (
    <>
      <TituloGenerico titulo="Editar Cine" accion={accion} buttonText="Volver" />

      <div className="div-center">
        <FormularioCines onFinish={onFinish} buttonName="Editar" modelo={modelo}/>
      </div>
    </>
  );
}
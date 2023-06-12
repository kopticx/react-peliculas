import { useNavigate } from "react-router-dom";
import TituloGenerico from "../Utils/TituloGenerico";
import FormularioActores from "./FormularioActores";
import axios from "axios";
import { notificacionError, notificacionSuccess } from "../Utils/Notificaciones";
import { actorToFormData } from "./ActorUtils";
import { useAppDispatch } from "../../redux/hooks/useTypedSelectors";
import { createActor } from "../../redux/slices/actorSlice";

export default function CrearActor() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {

    values = {
      ...values,
      foto: values.foto?.[0].originFileObj  
    }

    const data = actorToFormData(values);

    await dispatch(createActor(data));
    navigate('/')
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

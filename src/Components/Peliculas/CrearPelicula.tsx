import { useNavigate } from "react-router-dom";
import FormularioPeliculas from "./FormularioPeliculas";
import TituloGenerico from "../Utils/TituloGenerico";
import { peliculaToFormData } from "./PeliculaUtils";
import { useAppDispatch } from "../../redux/hooks/useTypedSelectors";
import { postPelicula } from "../../redux/slices/peliculaSlice";
import { notificacionError, notificacionSuccess } from "../Utils/Notificaciones";

export default function CrearPelicula() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {

      values = {
        ...values,
        poster: values.poster?.[0].originFileObj  
      }

      const data = peliculaToFormData(values);
      
      const response = await dispatch(postPelicula(data));

      if(response.meta.requestStatus === 'fulfilled'){
        notificacionSuccess({message: 'Pelicula creada', description: 'La pelicula se creo correctamente'})
      }
      
      if(response.meta.requestStatus === 'rejected'){
        notificacionError({message: 'No se pudo crear la pelicula', description: 'Error al intentar crear la pelicula'})
      }

      return navigate('/')
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

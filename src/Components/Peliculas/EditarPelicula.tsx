import { useNavigate, useParams } from "react-router-dom";
import TituloGenerico from "../Utils/TituloGenerico";
import FormularioPeliculas from "./FormularioPeliculas";
import { peliculaFormularioDTO } from "./Peliculas.model";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/useTypedSelectors";
import { useEffect } from "react";
import { getPelicula, putPelicula } from "../../redux/slices/peliculaSlice";
import { selectedCinesDTO } from "../Cines/Cines.model";
import { selectedActoresDTO } from "../Actores/Actores.model";
import { peliculaToFormData } from "./PeliculaUtils";
import { notificacionError, notificacionSuccess } from "../Utils/Notificaciones";

export default function EditarPelicula() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {id}: any = useParams();

    const { pelicula } = useAppSelector((state) => state.peliculas);
    
    useEffect(() => {
      dispatch(getPelicula(id))
    }, [id]);

  const modelo: peliculaFormularioDTO = {
    ...pelicula,
    fechaEstreno: dayjs(pelicula.fechaEstreno),
    generos: pelicula.generos.map(genero => genero.id),
    cines: pelicula.cines.map((cine)  => String(cine.id)),
    actores: pelicula.actores.map((actor): selectedActoresDTO => ({id: actor.id, personaje: actor.personaje}))
  }

  const onFinish = async (values: any) => {
    values = {
      ...values,
      poster: values.poster?.[0].originFileObj  
    }

    const data = peliculaToFormData(values);
    
    const response = await dispatch(putPelicula({id, pelicula: data}));

    if(response.meta.requestStatus === 'fulfilled'){
      notificacionSuccess({message: 'Pelicula editada', description: 'La pelicula se editó correctamente'})
    }
    
    if(response.meta.requestStatus === 'rejected'){
      notificacionError({message: 'No se pudo editar la pelicula', description: 'Error al intentar editar la pelicula'})
    }

    return navigate(`/pelicula/${id}`)
  };

  const accion = () => {
    navigate(-1);
  };

  return (
    <>
      <TituloGenerico
        titulo="Editar Pelicula"
        accion={accion}
        buttonText="Volver"
      />

      <div className="div-center">
        {
          pelicula.id &&
          <FormularioPeliculas onFinish={onFinish} buttonName="Editar" modelo={modelo} />
        }
      </div>

      </>
  );
}
import { useNavigate } from "react-router-dom";
import TituloGenerico from "../Utils/TituloGenerico";
import { useEffect } from "react";
import ListadoActores from "./ListadoActores";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/useTypedSelectors";
import { getActores } from "../../redux/slices/actorSlice";

export default function IndexActores() {
  const dispatch = useAppDispatch();
  const { actores } = useAppSelector((state) => state.actores)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getActores());
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

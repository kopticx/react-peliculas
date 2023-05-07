import axios from "axios";
import { useEffect, useState } from "react";
import TituloGenerico from "../Utils/TituloGenerico";
import css from '../Utils/custom.module.css';
import CrearGenero from "./CrearGenero";
import { genero } from "./Generos.model";
import ListadoGeneros from "./ListadoGeneros";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/useTypedSelectors";
import { getGeneros } from "../../redux/slices/generoSlice";

export default function IndexGeneros() {

  const dispatch = useAppDispatch();
  
  const {generos} = useAppSelector(state => state.generos);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getGeneros());
  }, [])

  const accion = () => {
    setOpen(true);
  }

  return (
    <>
      <TituloGenerico titulo="Género" accion={accion} buttonText="Crear Género" />

      <CrearGenero open={open} setOpen={setOpen} />

      <div className="p-3">
        <div className={`${css.containerWhite}`}>
          <ListadoGeneros generos={generos} />
        </div>
      </div>
    </>

  );
}

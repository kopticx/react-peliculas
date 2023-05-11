import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/useTypedSelectors';
import css from '../../Utils/custom.module.css'
import ListadoPeliculas from '../ListadoPeliculas';
import FormularioFiltroPeliculas from "./FormularioFiltroPeliculas";
import { filtrarPeliculas } from '../../../redux/slices/peliculaSlice';
import { filtroPeliculasForm } from '../Peliculas.model';

export default function FiltroPeliculas() {
  
  return (
    <>
      <h3 className="title">Filtro Peliculas</h3>

      <FormularioFiltroPeliculas />
    </>
  );
}
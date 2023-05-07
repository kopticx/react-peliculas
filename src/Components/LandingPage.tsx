import { useEffect, useState } from "react";
import ListadoPeliculas from "./Peliculas/ListadoPeliculas";
import { landingPageDTO } from "./Peliculas/Peliculas.model";
import { useAppDispatch, useAppSelector } from "../redux/hooks/useTypedSelectors";
import { getPeliculas } from "../redux/slices/peliculaSlice";

export default function LandingPage() {
  
  const dispatch = useAppDispatch();

  const { enCines, proximosEstrenos } = useAppSelector((state) => state.peliculas);

  useEffect(() => {
    dispatch(getPeliculas());
  }, []);

  return (
    <>
      <h3 className="title">En cartelera</h3>
      <ListadoPeliculas peliculas={enCines} />

      <h3 className="title">Proximos Estrenos</h3>
      <ListadoPeliculas peliculas={proximosEstrenos} />
    </>
  );
}

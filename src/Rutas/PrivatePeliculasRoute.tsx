import { Route, Routes } from "react-router-dom";
import CrearPelicula from "../Components/Peliculas/CrearPelicula";
import EditarPelicula from "../Components/Peliculas/EditarPelicula";

export default function PrivatePeliculasRoute() {
  return (
    <Routes>
      <Route path="crear" element={<CrearPelicula />} />
      <Route path="editar/:id" element={<EditarPelicula />} />
    </Routes>
  );
}

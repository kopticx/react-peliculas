import { Route, Routes } from "react-router-dom";
import CrearActor from "../Components/Actores/CrearActor";
import EditarActor from "../Components/Actores/EditarActor";

export default function PrivateActoresRoute() {
  return (
    <Routes>
      <Route path="crear" element={<CrearActor />} />
      <Route path="editar/:id" element={<EditarActor />} />
    </Routes>
  );
}
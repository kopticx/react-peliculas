import { Route, Routes } from "react-router-dom";
import CrearCine from "../Components/Cines/CrearCine";
import EditarCine from "../Components/Cines/EditarCine";

export default function PrivateCinesRoute() {
    return(
        <Routes>
            <Route path="crear" element={<CrearCine />} />
            <Route path="editar/:id" element={<EditarCine />} />
        </Routes>
    )
}
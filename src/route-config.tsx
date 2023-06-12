import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Components/Layout";
import LandingPage from "./Components/LandingPage";
import IndexGeneros from "./Components/Generos/IndexGeneros";
import EditarGenero from "./Components/Generos/EditarGenero";
import IndexActores from "./Components/Actores/IndexActores";
import CrearActor from "./Components/Actores/CrearActor";
import EditarActor from "./Components/Actores/EditarActor";
import IndexCines from "./Components/Cines/IndexCines";
import NotFound from "./Components/Utils/NotFound";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import PrivateCinesRoute from "./Rutas/PrivateCinesRoute";
import FiltroPeliculas from "./Components/Peliculas/FiltroPeliculas/FiltroPeliculas";
import DetallePelicula from "./Components/Peliculas/DetallePelicula";
import PrivatePeliculasRoute from "./Rutas/PrivatePeliculasRoute";
import SignIn from "./Components/Auth/Signin";
import Login from "./Components/Auth/Login";
import PrivateActoresRoute from "./Rutas/PrivateActoresRoute";

export const rutas = createBrowserRouter(
  createRoutesFromElements(
    <>
      //Auth
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<Login />} />

      //Rutas publicas
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        //Peliculas
        <Route path="/peliculas/filtrar" element={<FiltroPeliculas />} />
        <Route path="/peliculas/:id" element={<DetallePelicula />} />
        <Route
          path="/pelicula/*"
          element={
            <PrivateRoute role="admin">
              <PrivatePeliculasRoute />
            </PrivateRoute>
          }
        />

        //Generos
        <Route path="/generos" element={<IndexGeneros />} />
        <Route
          path="/generos/editar/:id"
          element={
            <PrivateRoute role="admin">
              <EditarGenero />
            </PrivateRoute>
          }
        />

        //Cines
        <Route path="/cines" element={<IndexCines />} />
        <Route
          path="/cines/*"
          element={
            <PrivateRoute role="admin">
              <PrivateCinesRoute />
            </PrivateRoute>
          }
        />

        //Actores
        <Route path="/actores" element={<IndexActores />} />
        <Route path="/actores/*" element={
          <PrivateRoute role="admin">
            <PrivateActoresRoute />
          </PrivateRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

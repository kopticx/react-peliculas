import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import LandingPage from "./Components/LandingPage";
import IndexGeneros from "./Components/Generos/IndexGeneros";
import EditarGenero from "./Components/Generos/EditarGenero";
import IndexActores from "./Components/Actores/IndexActores";
import CrearActor from "./Components/Actores/CrearActor";
import EditarActor from "./Components/Actores/EditarActor";
import IndexCines from "./Components/Cines/IndexCines";
import CrearCine from "./Components/Cines/CrearCine";
import EditarCine from "./Components/Cines/EditarCine";
import CrearPelicula from "./Components/Peliculas/CrearPelicula";
import EditarPelicula from "./Components/Peliculas/EditarPelicula";
import FiltroPeliculas from "./Components/Peliculas/FiltroPeliculas/FiltroPeliculas";
import NotFound from "./Components/Utils/NotFound";

export const rutas = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      //Pelidculas
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/peliculas/crear",
        element: <CrearPelicula />
      },
      {
        path: "/peliculas/editar/:id",
        element: <EditarPelicula />
      },
      {
        path: "/peliculas/filtrar",
        element: <FiltroPeliculas />
      },
      //Generos
      {
        path: "/generos",
        element: <IndexGeneros />
      },
      {
        path: "/generos/editar/:id",
        element: <EditarGenero />
      },
      //Actores
      {
        path: "/actores",
        element: <IndexActores />
      },
      {
        path: "/actores/crear",
        element: <CrearActor />
      },
      {
        path: "/actores/editar/:id",
        element: <EditarActor />
      },
      //Cines
      {
        path: "/cines",
        element: <IndexCines />
      },
      {
        path: "/cines/crear",
        element: <CrearCine/>
      },
      {
        path: "/cines/editar/:id",
        element: <EditarCine />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);

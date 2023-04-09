import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import LandingPage from "./Components/LandingPage";
import IndexGeneros from "./Components/Generos/IndexGeneros";

export const rutas = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/generos",
        element: <IndexGeneros />
      }
    ],
  },
]);

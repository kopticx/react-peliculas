import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { rutas } from "./route-config";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={rutas} />
);

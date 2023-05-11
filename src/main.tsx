import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { rutas } from "./route-config";
import { Provider } from "react-redux";
import store from "./redux/store";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = 'pk.eyJ1Ijoia29wdGljeCIsImEiOiJjbGdxNGpreHAxNXkxM2VqcWJyczQ2ZmFiIn0.pgsytqCJ5SQIzNempqGysw';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={rutas} />
  </Provider>
);

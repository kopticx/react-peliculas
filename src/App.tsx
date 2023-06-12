import { RouterProvider } from "react-router-dom";
import { rutas } from "./route-config";
import { useAppDispatch } from "./redux/hooks/useTypedSelectors";
import { useEffect } from "react";
import { obtenerClaims } from "./Components/Auth/AuthUtils";
import { getUsuario, setClaims } from "./redux/slices/authSlice";
import { configurarInterceptor } from "./Components/Utils/Interceptores";

configurarInterceptor();

export default function App() {
  const dispatch = useAppDispatch();

  const startUpApp = async () => {
    const claims = obtenerClaims();

    if(claims.length === 0 || undefined) {
        return;
    }

    await dispatch(setClaims(claims));
    await dispatch(getUsuario());
  }


  useEffect(() => {
    startUpApp();
  }, []);

  return <RouterProvider router={rutas} />;
}

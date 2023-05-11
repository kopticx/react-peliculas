import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useTypedSelectors";

export default function PrivateRoute({ children, role }: privateRouteProps) {
  const { autenticado, claims } = useAppSelector((state) => state.autenticacion);

  if (autenticado) {
    if (role && claims) {
      if (!claims.some(x => x.nombre === 'role' && x.valor === role)) {
        return <Navigate to="/" />;
      }
    }
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

interface privateRouteProps {
  children: React.ReactElement;
  role?: string;
}

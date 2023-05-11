import { IconMovie } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useTypedSelectors";

export default function Header() {

  const location = useLocation();
  const {autenticado, fotoUsuario, claims} = useAppSelector(state => state.autenticacion);
	
  return (
    <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
	<div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
		{/* <!-- Logo --> */}
		<div className="text-indigo-500 md:order-1">
			{/* <!-- Heroicon - Chip Outline --> */}
			<IconMovie className="h-10 w-10"/>
		</div>
		<div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
			<ul className="flex font-semibold justify-between">
				<li className="md:px-4 md:py-2 hover:text-indigo-400"><Link className={`${location.pathname === '/' && "text-indigo-500"}`} to={'/'}>Peliculas</Link></li>
				<li className="md:px-4 md:py-2 hover:text-indigo-400"><Link className={`${location.pathname === '/peliculas/filtrar' && "text-indigo-500"}`} to={'/peliculas/filtrar'}>Filtrar Peliculas</Link></li>
				<li className="md:px-4 md:py-2 hover:text-indigo-400"><Link className={`${location.pathname === '/generos' && "text-indigo-500"}`} to={'/generos'}>Generos</Link></li>
				<li className="md:px-4 md:py-2 hover:text-indigo-400"><Link className={`${location.pathname === '/actores' && "text-indigo-500"}`} to={'/actores'}>Actores</Link></li>
				<li className="md:px-4 md:py-2 hover:text-indigo-400"><Link className={`${location.pathname === '/cines' && "text-indigo-500"}`} to={'/cines'}>Cines</Link></li>
			</ul>
		</div>
			<div className="order-2 md:order-3">
				{
					!autenticado ? <Link className="px-4 py-2 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl" to={'/login'}>Login</Link>
					:
					<div className="flex">
						<span className="mr-2 py-1 text-sm font-semibold text-center text-gray-600">{claims.find(x => x.nombre === 'username')?.valor}</span>

						<img
							className="h-8 w-8 rounded-full"
							src={fotoUsuario}
							alt=""
						/>
					</div>
				}
			</div>
	</div>
</nav>
  )
}

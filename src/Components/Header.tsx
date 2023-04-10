import { Link, useLocation } from "react-router-dom";

export default function Header() {

  const location = useLocation();
	
  return (
    <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
	<div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
		{/* <!-- Logo --> */}
		<div className="text-indigo-500 md:order-1">
			{/* <!-- Heroicon - Chip Outline --> */}
			<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-movie h-10 w-10" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
				<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
				<path d="M8 4l0 16"></path>
				<path d="M16 4l0 16"></path>
				<path d="M4 8l4 0"></path>
				<path d="M4 16l4 0"></path>
				<path d="M4 12l16 0"></path>
				<path d="M16 8l4 0"></path>
				<path d="M16 16l4 0"></path>
			</svg>
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
			<a className="px-4 py-2 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" href="#">Sign in</a>
		</div>
	</div>
</nav>
  )
}

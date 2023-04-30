import axios from "axios";
import mapboxgl, { Marker } from 'mapbox-gl';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TituloGenerico from "../Utils/TituloGenerico";
import MapView from "./MapView";
 
mapboxgl.accessToken = 'pk.eyJ1Ijoia29wdGljeCIsImEiOiJjbGdxNGpreHAxNXkxM2VqcWJyczQ2ZmFiIn0.pgsytqCJ5SQIzNempqGysw';

export default function IndexCines() {

  const navigate = useNavigate();
  const [cines, setCines] = useState<Marker[]>([]);

  const obtenerCines = async () => {
    const dataCines = await axios.get(`${import.meta.env.VITE_API_URL}/cines/getCines`)

    const cinesMap: Marker[] = dataCines.data.map((cine: any) => {
      return new Marker().setLngLat([cine.lng, cine.lat])
                         .setPopup(new mapboxgl.Popup().setHTML(`<h3 class="text-sm">${cine.nombre}</h3>`));
    });
    
    setCines(cinesMap);
  }

  useEffect(() => {
    obtenerCines();
  }, [])

  const accion = () => {
    navigate('crear');
  }
  
  return (

    <>
      <TituloGenerico titulo="Index Cines" accion={accion} buttonText="Crear Cine" />

      <div className="mx-auto w-1/2 mt-5">
        {
          cines.length > 0 && <MapView cines={cines} canClick={false} /> 
        }
      </div>
    </>
  );
}

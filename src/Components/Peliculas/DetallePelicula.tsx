import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks/useTypedSelectors";
import { getPelicula } from "../../redux/slices/peliculaSlice";
import { Avatar, Card, Tag } from "antd";
import dayjs from "dayjs";
import Meta from "antd/es/card/Meta";
import MapView from "../Cines/MapView";
import { cineDTO } from "../Cines/Cines.model";
import { Marker, Popup } from "mapbox-gl";
import Rating from "../Utils/Rating";

export default function DetallePelicula() {
  const { id }: any = useParams();
  const dispatch = useAppDispatch();
  const { pelicula } = useAppSelector((state) => state.peliculas);

  useEffect(() => {
    dispatch(getPelicula(id));
  }, [id]);

  function generarURLYoutube(url: any): string {
    if (!url) {
      return "";
    }

    var videoId = url.split("v=")[1];
    var positionAmpersand = videoId.indexOf("&");

    if (positionAmpersand !== -1) {
      videoId = videoId.substring(0, positionAmpersand);
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }

  function convertirCines(cines: cineDTO[]): Marker[] {
    const cinesMap = cines.map((cine) => {
        return new Marker().setLngLat([cine.lng, cine.lat]).setPopup(new Popup({ offset: 25 }).setHTML(`<h3>${cine.nombre}</h3>`))
    })

    return cinesMap;
  }

  return (
    <>
      <h3 className="title">{pelicula.titulo}</h3>
      <p className="mb-2 font-bold text-indigo-600">
        {dayjs(pelicula.fechaEstreno).format("DD-MM-YYYY")}
      </p>

      {pelicula.generos.map((genero) => (
        <Tag key={genero.id} bordered={false} color="purple">
          {genero.nombre}
        </Tag>
      ))}

      <div className="flex gap-3">
        <h3 className="subtitle text-xl mt-1">Tu voto: </h3>
        <Rating votoUsuario={pelicula.votoUsuario} />  
      </div>

      <div className="flex gap-5">
        <span>
          <img
            src={pelicula.posterUrl}
            className="w-56"
            style={{ height: "315px" }}
            alt="poster"
          />
        </span>

        <iframe
          title="youtube-trailer"
          width={560}
          height={315}
          src={generarURLYoutube(pelicula.trailer)}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-4 w-1/2">
        <h3 className="subtitle">Sinopsis</h3>
        <p className="mb-2 font-semibold">{pelicula.resumen}</p>
      </div>

      <div className="mt-1 w-1/2">
        <h3 className="subtitle">Actores</h3>
        <div className="flex flex-wrap gap-1">
          {pelicula.actores.map((actor) => (
            <Card style={{ width: 260 }} key={actor.id}>
              <Meta
                avatar={<Avatar size={80} src={actor.foto} alt="actor" />}
                title={actor.nombre}
                description={actor.personaje}
              />
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-1 mb-3 w-1/2">
        <h3 className="subtitle">Proyectada en los siguientes cines</h3>
        {pelicula.cines.length > 0 ? 
            <MapView cines={convertirCines(pelicula.cines)} canClick={false} /> 
            : 
            null    
        }
      </div>
    </>
  );
}

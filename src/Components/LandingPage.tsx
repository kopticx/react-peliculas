import { useEffect, useState } from "react";
import ListadoPeliculas from "./Peliculas/ListadoPeliculas";
import { landingPageDTO } from "./Peliculas/Peliculas.model";

export default function LandingPage() {
  const [peliculas, setPeliculas] = useState<landingPageDTO>({});

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPeliculas({
        enCartelera: [
          {
            id: 1,
            titulo: "El señor de los anillos",
            poster:
              "https://images.moviesanywhere.com/198e228b071c60f5ad57e5f62fe60029/ff22cad6-2218-414d-b853-3f95d76905c7.jpg",
          },
          {
            id: 2,
            titulo: "Harry Potter y la piedra filosofal",
            poster:
              "https://es.web.img2.acsta.net/pictures/14/04/30/11/55/592219.jpg",
          },
        ],
        proximosEstrenos: [
          {
            id: 3,
            titulo: "El caballero de la noche",
            poster:
              "https://m.media-amazon.com/images/M/MV5BZjE1YmM4ZjYtMDQ3YS00OWIwLWJmZDItMmRhN2U3ZjE3ZTQ1XkEyXkFqcGdeQXVyMTAyOTE2ODg0._V1_.jpg",
          },
          {
            id: 4,
            titulo: "Busqueda implacable",
            poster:
              "https://m.media-amazon.com/images/M/MV5BMTgxZGY2ZmItNmI3Ny00Njk2LWIwMDQtNjkzNTRlZTQ5NjlhXkEyXkFqcGdeQXVyMjI1OTQ2MjU@._V1_.jpg",
          },
        ],
      });
    }, 1000);

    return () => clearTimeout(timerId);
  });

  return (
    <>
      <h3>En cartelera</h3>
      <ListadoPeliculas peliculas={peliculas.enCartelera} />

      <h3>Proximos Estrenos</h3>
      <ListadoPeliculas peliculas={peliculas.proximosEstrenos} />
    </>
  );
}

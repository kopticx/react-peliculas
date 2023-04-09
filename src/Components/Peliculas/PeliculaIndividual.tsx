import { pelicula } from "./Peliculas.model";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import css from "./PeliculaIndividual.module.css"

export default function PeliculaIndividual(props: peliculaIndividualProps) {
  const link = `pelicula/${props.pelicula.id}`;

  return (
    <Card
      className={css.cardPelicula}
      hoverable
      cover={<img alt="example" src={props.pelicula.poster} />}
      onClick={() => console.log("click")}
    >
      <Meta title={props.pelicula.titulo}/>
    </Card>
  );
}

interface peliculaIndividualProps {
  pelicula: pelicula;
}

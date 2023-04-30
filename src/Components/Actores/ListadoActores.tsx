import ListadoGenerico from "../Utils/ListadoGenerico";
import ActorIndividual from "./ActorIndividual";
import { actor } from "./Actores.model";
import css from "./Actores.module.css";

export default function ListadoActores({ actores }: listadoActoresProps) {
  return (
    <ListadoGenerico listado={actores}>
      <div className={css.divListado}>
        {actores.map((actor) => (
          <ActorIndividual actor={actor} key={actor.id} />
        ))}
      </div>
    </ListadoGenerico>
  );
}

interface listadoActoresProps {
  actores: actor[];
}

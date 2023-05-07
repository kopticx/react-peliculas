import dayjs from "dayjs";
import { peliculaFormularioDTO, peliculaPostDTO } from "./Peliculas.model";

export function peliculaToFormData(pelicula: peliculaPostDTO): FormData {
    const formData = new FormData();

    formData.append('titulo', pelicula.titulo); 
    formData.append('resumen', pelicula.resumen);
    formData.append('trailer', pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));
    formData.append('fechaEstreno', dayjs(pelicula.fechaEstreno).format());

    if (pelicula.poster){
        formData.append('poster', pelicula.poster);
    }

    console.log(pelicula.cines);
    

    formData.append('generosIds', JSON.stringify(pelicula.generos));
    formData.append('cinesIds', JSON.stringify(pelicula.cines.map(cine => (Number(cine)))));
    formData.append('actores', JSON.stringify(pelicula.actores.map(actor => ({ id: actor.id, personaje: actor.personaje }))));

    return formData;
}
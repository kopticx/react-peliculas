import { actor } from "../../Components/Actores/Actores.model";
import { cine } from "../../Components/Cines/Cines.model";
import { genero } from "../../Components/Generos/Generos.model";
import { pelicula } from "../../Components/Peliculas/Peliculas.model";

export interface generoState {
    generos: genero[];
    error: string;
}

export interface peliculaState {
    peliculas: pelicula[];
    enCines: pelicula[];
    proximosEstrenos: pelicula[];
    pelicula: pelicula;
    error: string;
}

export interface cineState {
    cines: cine[];
    error: string;
}

export interface actorState {
    actores: actor[];
    error: string;
}
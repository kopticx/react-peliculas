import { actor } from "../../Components/Actores/Actores.model";
import { claim } from "../../Components/Auth/Auth.model";
import { cine } from "../../Components/Cines/Cines.model";
import { genero } from "../../Components/Generos/Generos.model";
import { pelicula, peliculaDTO } from "../../Components/Peliculas/Peliculas.model";

export interface generoState {
    generos: genero[];
    error: string;
}

export interface peliculaState {
    peliculas: pelicula[];
    enCines: pelicula[];
    proximosEstrenos: pelicula[];
    pelicula: pelicula;
    peliculasFiltro: peliculaDTO[];
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

export interface authState {
    autenticado: boolean;
    fotoUsuario: string;
    claims: claim[];
}

type usuario = {
    email: string;
    userName: string;
    fotoURL: string;
}
import { actor, actorDTO } from "../../Components/Actores/Actores.model";
import { claim } from "../../Components/Auth/Auth.model";
import { cine } from "../../Components/Cines/Cines.model";
import { genero } from "../../Components/Generos/Generos.model";
import { pelicula, peliculaDTO } from "../../Components/Peliculas/Peliculas.model";

export interface generoState {
    generos: genero[];
    error: string;
}

export interface peliculaState {
    peliculas: peliculaDTO[];
    enCines?: peliculaDTO[];
    proximosEstrenos?: peliculaDTO[];
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
    actor: actor;
    error: string;
}

export interface authState {
    autenticado: boolean;
    claims: claim[];
    usuario: usuario;
}

export type usuario = {
    id: string;
    email: string;
    userName: string;
    fotoUrl: string;
}
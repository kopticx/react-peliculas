import { Dayjs } from "dayjs";
import { actorPeliculaDTO, selectedActoresDTO } from "../Actores/Actores.model";
import { cineDTO, selectedCinesDTO } from "../Cines/Cines.model";
import { generoDTO, selectedGeneroDTO } from "../Generos/Generos.model";

export interface pelicula {
    id: number;
    titulo: string;
    resumen: string;
    trailer: string;
    enCines: boolean;
    fechaEstreno?: Date;
    posterUrl: string;
    generos: generoDTO[];
    actores: actorPeliculaDTO[];
    cines: cineDTO[];
}

export interface peliculaDTO {
    id: number;
    titulo: string;
    resumen: string;
    trailer: string;
    enCines: boolean;
    fechaEstreno: Dayjs;
    posterUrl: string;
}

export type peliculaFormularioDTO = {
    titulo: string;
    resumen: string;
    enCines: boolean;
    trailer: string;
    fechaEstreno: dayjs;
    posterUrl?: string;
    generos: number[];
    cines: string[];
    actores: selectedActoresDTO[];
}

export interface peliculaPostDTO {
    titulo: string;
    resumen: string;
    enCines: boolean;
    trailer: string;
    fechaEstreno: dayjs;
    poster: File;
    generos: number[];
    cines: string[];
    actores: actorPeliculaDTO[];
}

export interface landingPageDTO {
    enCartelera?: pelicula[];
    proximosEstrenos?: pelicula[];
}

export interface filtroPeliculasForm {
    titulo: string;
    generoId?: number;
    proximosEstrenos: boolean;
    enCines: boolean;
}
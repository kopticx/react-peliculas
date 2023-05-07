import dayjs, { Dayjs } from 'dayjs'

export interface actor {
    id: number;
    nombre: string;
    biografia: string;
    fechaNacimiento: Dayjs;
    fotoURL: string;
}

export interface actoresFormularioDTO {
    nombre: string;
    fechaNacimiento: Dayjs;
    biografia: string;
    fotoURL: string;
    foto: File;
}

interface actorPeliculaDTO {
    id: number;
    nombre: string;
    foto: string;
    personaje: string;
}

export type selectActorDTO = {
    id: number;
    nombre: string;
}

export type selectedActoresDTO = {
    id: number;
    personaje: string;
}
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

export interface actoresTransferDTO {
    key: string;
    nombre: string;
}
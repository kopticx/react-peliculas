export interface cine{
    id: number;
    nombre: string;
    ubicacion: Marker;
}

export interface cineDTO{
    id: number;
    nombre: string;
    lat: number;
    lng: number;
}

export interface cinesTransferDTO {
    key: string;
    nombre: string;
}

export type selectedCinesDTO = {
    key: string;
}

export interface cinesFormularioDTO{
    nombre: string;
    ubicacion: Marker;
}

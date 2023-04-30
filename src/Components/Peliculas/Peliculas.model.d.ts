import dayjs from "dayjs";

export interface pelicula {
    id: number;
    titulo: string;
    poster: string;
}

export interface peliculaFormularioDTO {
    titulo: string;
    enCines: boolean;
    trailer: string;
    fechaLanzamiento?: dayjs;
    posterUrl?: string;
    generos?: selectGeneroDTO[];
    cines?: cinesTransferDTO[];
    actores?: actoresTransferDTO[];
}

export interface landingPageDTO {
    enCartelera?: pelicula[];
    proximosEstrenos?: pelicula[];
}
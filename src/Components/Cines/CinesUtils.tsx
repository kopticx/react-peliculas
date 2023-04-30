export const crearObjetoPOSTCine = ({nombre, ubicacion}: any) => {
    const creacionCine = {
        nombre,
        lat: ubicacion.lat,
        lng: ubicacion.lng
    }

    return creacionCine;
}
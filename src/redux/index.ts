import { combineReducers } from "@reduxjs/toolkit";
import generoSlice from "./slices/generoSlice";
import cineSlice from "./slices/cineSlice";
import actorSlice from "./slices/actorSlice";
import peliculaSlice from "./slices/peliculaSlice";

export default combineReducers({
    actores: actorSlice,
    cines: cineSlice,
    generos: generoSlice,
    peliculas: peliculaSlice
})
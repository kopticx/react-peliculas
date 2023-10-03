import {combineReducers} from "@reduxjs/toolkit";
import generoSlice from "./slices/generoSlice";
import cineSlice from "./slices/cineSlice";
import actorSlice from "./slices/actorSlice";
import peliculaSlice from "./slices/peliculaSlice";
import authSlice from "./slices/authSlice";

export default combineReducers({
  actores: actorSlice,
  autenticacion: authSlice,
  cines: cineSlice,
  generos: generoSlice,
  peliculas: peliculaSlice
})
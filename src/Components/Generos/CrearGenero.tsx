import axios from "axios";
import FormularioCreacionGeneros from "./FormularioCreacionGenero";
import { genero, generoDTO } from "./Generos.model";
import { redirect } from "react-router-dom";

export default function CrearGenero({ open, setOpen, generos, setGeneros }: crearGeneroProps) {

  const onCreate = async (values: generoDTO) => {
    
    const respuesta = await axios.post<genero>(`${import.meta.env.VITE_API_URL}/generos/postGenero`, values)
    
    setGeneros([...generos, respuesta.data]);

    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  }

  return (
    <FormularioCreacionGeneros open={open} onAction={onCreate} onCancel={onCancel} />
  )
}

interface crearGeneroProps {
  open: boolean
  setOpen: (open: boolean) => void
  generos: genero[]
  setGeneros: (generos: genero[]) => void
}
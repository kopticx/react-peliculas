import axios from "axios";
import FormularioCreacionGeneros from "./FormularioCreacionGenero";
import { genero, generoCreacionDTO } from "./Generos.model";
import { redirect } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/useTypedSelectors";
import { postGenero } from "../../redux/slices/generoSlice";

export default function CrearGenero({ open, setOpen }: crearGeneroProps) {

  const dispatch = useAppDispatch();

  const onCreate = async (values: generoCreacionDTO) => {
    
    dispatch(postGenero(values));

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
}
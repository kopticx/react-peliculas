import FormularioCreacionGeneros from "./FormularioCreacionGenero";
import { GeneroFormProps } from "./Generos.model";



export default function CrearGenero({
    open,
    onAction,
    onCancel,
  }: GeneroFormProps) {

    return(
        <FormularioCreacionGeneros open={open} onAction={onAction} onCancel={onCancel} />
    )
}


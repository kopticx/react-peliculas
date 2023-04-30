import dayjs from "dayjs";
import { actoresFormularioDTO } from "./Actores.model";

export function actorToFormData(actor: actoresFormularioDTO): FormData {
    const formData = new FormData();

    formData.append('nombre', actor.nombre);
    formData.append('fechaNacimiento', dayjs(actor.fechaNacimiento).format());
    formData.append('biografia', actor.biografia);

    if (actor.foto){
        formData.append('foto', actor.foto);
    }

    return formData;
}
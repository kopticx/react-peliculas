import { useNavigate } from "react-router-dom";
import TituloGenerico from "../Utils/TituloGenerico";
import FormularioPeliculas from "./FormularioPeliculas";
import { peliculaFormularioDTO } from "./Peliculas.model";
import dayjs from "dayjs";

export default function EditarPelicula() {
    const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const accion = () => {
    navigate(-1);
  };

  const modelo: peliculaFormularioDTO = {
    titulo: "SPIDER-MAN: SIN CAMINO A CASA",
    enCines: true,
    trailer: "https://www.youtube.com/watch?v=r6t0czGbuGI",
    fechaLanzamiento: dayjs(),
    posterUrl: 'https://http2.mlstatic.com/D_NQ_NP_799595-MLM48347647812_112021-O.jpg',
    generos: [1, 2],
    actores: ["1", "2"],
    cines: ["1", "2"]
  }

  return (
    <>
      <TituloGenerico
        titulo="Editar Pelicula"
        accion={accion}
        buttonText="Volver"
      />

      <div className="div-center">
        <FormularioPeliculas onFinish={onFinish} buttonName="Editar" modelo={modelo} />
      </div>

      </>
  );
}
import { pelicula } from "./Peliculas.model";
import { Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import css from "./PeliculaIndividual.module.css"
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

export default function PeliculaIndividual(props: peliculaIndividualProps) {
  const linkDetalle = `pelicula/${props.pelicula.id}`;
  const linkEditar = `pelicula/editar/${props.pelicula.id}`;
  const navigate = useNavigate();

  return (
    <Card
      className={css.cardPelicula}
      hoverable
      cover={<img alt="example" src={props.pelicula.posterUrl} />}
      actions={[
        <Tooltip title="Ver detalles">
          <EyeOutlined onClick={() => navigate(linkDetalle)} />
        </Tooltip>,

        <Tooltip title="Editar">
          <EditOutlined onClick={() => navigate(linkEditar)} key="edit" />
        </Tooltip>,

        <Tooltip title="Eliminar">
          <DeleteOutlined className="hover:text-red-600" key="delete" />
        </Tooltip>,
      ]}
    >
      <Meta title={props.pelicula.titulo}/>
    </Card>
  );
}

interface peliculaIndividualProps {
  pelicula: pelicula;
}

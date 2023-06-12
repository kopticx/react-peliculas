import { pelicula, peliculaDTO } from "./Peliculas.model";
import { Card, Popconfirm, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import css from "./PeliculaIndividual.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks/useTypedSelectors";
import { deletePelicula } from "../../redux/slices/peliculaSlice";

export default function PeliculaIndividual(props: peliculaIndividualProps) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const linkDetalle = `/peliculas/${props.pelicula.id}`;
  const linkEditar = `/pelicula/editar/${props.pelicula.id}`;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const confirmDelete = () => {
    setConfirmLoading(true);
    dispatch(deletePelicula(props.pelicula.id));

    setConfirmLoading(false);
    setOpen(false);
  }

  const popConfirmProps = {
    title:"Eliminar pelicula",
    description:"¿Está seguro que desea eliminar la pelicula?",
    open,
    onConfirm: confirmDelete,
    onCancel: () => setOpen(false),
    okButtonProps:{ className: "bg-red-600", loading: confirmLoading}
  }

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
          <Popconfirm {...popConfirmProps}>
            <DeleteOutlined className="hover:text-red-600" key="delete" onClick={() => setOpen(true)} />
          </Popconfirm>
        </Tooltip>,
      ]}
    >
      <Meta title={props.pelicula.titulo}/>
    </Card>
  );
}

interface peliculaIndividualProps {
  pelicula: peliculaDTO;
}

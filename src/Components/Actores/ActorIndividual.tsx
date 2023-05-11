import { Card, Popconfirm } from "antd";
import { actorDTO } from "./Actores.model";
import Meta from "antd/es/card/Meta";
import css from "./Actores.module.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { notificacionError, notificacionSuccess } from "../Utils/Notificaciones";

export default function ActorIndividual({actor}: actorIndividualProps) {

  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onClickEditar = () => {
    navigate(`editar/${actor.id}`);
  }

  const onClickEliminar = () => {
    setOpen(true);
  }

  const confirm = async () => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/actores/deleteActor/${actor.id}`)
          .then(() => {
            setConfirmLoading(false);
            setOpen(false);
            notificacionSuccess({message: "Actor eliminado", description: "El actor se eliminó correctamente."})
            navigate('/');
          })
          .catch(() => {
            setConfirmLoading(false);
            setOpen(false);
            notificacionError({message: "Error al eliminar el actor", description: "Hubo un error al eliminar el actor."})
          });
  }

  const cancel = () => {
    setOpen(false);
  }

  const popConfirmProps = {
    title:"Eliminar actor",
    description:"¿Está seguro que desea eliminar el actor?",
    open,
    onConfirm: confirm,
    onCancel: cancel,
    okButtonProps:{ className: "bg-red-600", loading: confirmLoading}
  }

  return (
    <Card
      className={css.cardActores}
      hoverable
      cover={<img alt="example" className="h-64" src={actor.fotoURL} />}
      onClick={() => console.log("click")}
      actions={[
        <EditOutlined key="edit" onClick={onClickEditar} />,
        <Popconfirm {...popConfirmProps}>
          <DeleteOutlined className="hover:text-red-600" key="delete" onClick={onClickEliminar} />
        </Popconfirm>
      ]}
    >
      <Meta title={actor.nombre} description={`${actor.biografia.substring(0, 50)}...`} />
    </Card>
  );
}

interface actorIndividualProps {
    actor: actorDTO;
}
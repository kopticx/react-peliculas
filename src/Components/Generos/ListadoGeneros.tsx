import { IconMasksTheater } from "@tabler/icons-react";
import { List, Popconfirm, notification } from "antd";
import { Link } from "react-router-dom";
import { genero } from "./Generos.model";
import axios from "axios";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

export default function ListadoGeneros({generos, setGeneros}: listadoGenerosProps) {

  const [genero, setGenero] = useState<genero>();

  const openNotificationWithIcon = () => {
    notification.success({
      message: "Género eliminado",
      description: "El género se elimino correctamente.",
      placement: "bottomRight",
      duration: 3,
    });
  }

  const confirm = async () => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/generos/DeleteGenero/${genero?.id}`);
    setGeneros([...generos.filter(x => x.id !== genero?.id)])
    openNotificationWithIcon();
  };

  const propsPopconfirm = {
    title: "Eliminar Genero.",
    description: "¿Está seguro de eliminar este género?",
    onConfirm: confirm,
    okText: "Eliminar",
    icon: <DeleteOutlined style={{ color: 'red' }} />,
    okButtonProps: {className: 'bg-red-600'},
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={generos}
      renderItem={(item) => (
        <List.Item
          actions={[<Link to={`/generos/editar/${item.id}`} className="text-indigo-600">Editar</Link>,
                     <Popconfirm {...propsPopconfirm}>
                        <a onClick={() => setGenero(item)} className="text-red-600">Eliminar</a>
                     </Popconfirm>]}
        >
          <List.Item.Meta
            avatar={<IconMasksTheater />}
            title={<Link to={`/generos/editar/${item.id}`}>{item.nombre}</Link>}
            description={item.descripcion} />
        </List.Item>)}
        pagination={{position: "bottom", align: "end", pageSize: 5}}
      />
  )
}

interface listadoGenerosProps {
  generos: genero[]
  setGeneros: (generos: genero[]) => void
}
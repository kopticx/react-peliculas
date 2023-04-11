import { IconMasksTheater } from "@tabler/icons-react";
import { List } from "antd";
import { Link } from "react-router-dom";

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

export default function ListadoGeneros() {
    return(
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                actions={[<Link to={`/generos/editar/${index}`} className="text-indigo-600">Editar</Link>, <a key="list-loadmore-more" className="text-red-600">Eliminar</a>]}
              >
                <List.Item.Meta
                  avatar={<IconMasksTheater />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={`Genero ${index}`} />
              </List.Item>)} />
    )
}
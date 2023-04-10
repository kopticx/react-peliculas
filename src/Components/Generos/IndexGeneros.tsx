import { Avatar, Button, List } from "antd";
import { Link } from "react-router-dom";
import css from '../Utils/custom.module.css'

export default function IndexGeneros() {

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

  return (
    <>
      <div className="flex justify-between mt-5">
        <Link className={`${css.buttonLikeAntD} order-last`} to={'/generos/crear'}>Crear Género</Link>
        <h3 className="text-3xl font-bold text-indigo-500 order-2">Géneros</h3>
        <p></p>
      </div>

      <div className="p-3">
        <div className="bg-white shadow-md rounded-md mx-auto px-5 py-10 mt-5">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
              actions={[<Link to={`/generos/editar/${index}`} className="text-indigo-600">Editar</Link>, <a key="list-loadmore-more" className="text-red-600">Eliminar</a>]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={`Genero ${index}`}/>
              </List.Item>)} />
        </div>
      </div>
    </>
    
  );
}

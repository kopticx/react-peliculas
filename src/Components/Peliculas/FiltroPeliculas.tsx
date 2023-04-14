import { Form } from "antd";

export default function FiltroPeliculas() {
  const valorInicial: filtroPeliculasForm = {
    titulo: "",
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <>
      <h3>Filtro Peliculas</h3>

      <Form initialValues={valorInicial} onFinish={onFinish} layout="inline">

      </Form>
    </>
  );
}

interface filtroPeliculasForm {
  titulo: string;
  generoId: number;
  proximosEstrenos: boolean;
  enCines: boolean;
}

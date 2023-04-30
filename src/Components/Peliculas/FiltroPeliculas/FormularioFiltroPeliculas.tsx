import { Button, Checkbox, Form, Input, Select } from "antd";
import css from "../../Utils/custom.module.css";
import { selectGeneroDTO } from "../../Generos/Generos.model";

export default function FormularioFiltroPeliculas() {
  const [form] = Form.useForm();

  const valorInicial: filtroPeliculasForm = {
    titulo: "",
    generoId: undefined,
    proximosEstrenos: false,
    enCines: false,
  };

  const onFinish = (values: filtroPeliculasForm) => {
    console.log("Success:", values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const options: selectGeneroDTO[] = [
    { id: 1, nombre: "Acción" },
    { id: 2, nombre: "Comedia" },
    { id: 3, nombre: "Drama" },
    { id: 4, nombre: "Terror" },
    { id: 5, nombre: "Romance" },
  ];

  return (
    <div className="flex justify-center">
      <Form
        form={form}
        initialValues={valorInicial}
        onFinish={onFinish}
        layout="inline"
        name="basic"
      >
        <Form.Item>
          <div className="label">Titulo</div>
          <Form.Item
            wrapperCol={{ span: 32 }}
            name="titulo"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del género.",
              },
            ]}
          >
            <Input placeholder="Titulo de la pelicula" allowClear />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <div className="label">Genero</div>
          <Form.Item wrapperCol={{ span: 16 }} name="generoId">
            <Select
              fieldNames={{ label: "nombre", value: "id" }}
              showSearch
              style={{ width: 200 }}
              placeholder="Género"
              filterOption={(input, option) =>
                (option?.nombre ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={options}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 32 }}
          valuePropName="checked"
          name="proximosEstrenos"
        >
          <Checkbox className="mt-6 label">Proximos Estrenos</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 32 }}
          valuePropName="checked"
          name="enCines"
        >
          <Checkbox className="mt-6 label">En cines</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button className={`${css.buttonLikeAntD} mt-5`} htmlType="submit">
            Filtrar
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" className={`mt-5`} danger onClick={onReset}>
            Limpiar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

interface filtroPeliculasForm {
  titulo: string;
  generoId?: number;
  proximosEstrenos: boolean;
  enCines: boolean;
}

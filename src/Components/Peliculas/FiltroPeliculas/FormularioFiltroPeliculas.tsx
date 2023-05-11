import { Button, Checkbox, Form, Input, Select } from "antd";
import { selectGeneroDTO } from "../../Generos/Generos.model";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks/useTypedSelectors";
import { useEffect } from "react";
import { getGeneros } from "../../../redux/slices/generoSlice";
import { filtroPeliculasForm } from "../Peliculas.model";
import { filtrarPeliculas } from "../../../redux/slices/peliculaSlice";
import ListadoPeliculas from "../ListadoPeliculas";

export default function FormularioFiltroPeliculas() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const valorInicial: filtroPeliculasForm = {
    titulo: "",
    generoId: undefined,
    proximosEstrenos: false,
    enCines: false,
  };

  const { peliculasFiltro } = useAppSelector((state) => state.peliculas);

  useEffect(() => {
    dispatch(getGeneros());
    dispatch(filtrarPeliculas(valorInicial));
  }, []);

  const onFinish = (values: filtroPeliculasForm) => {
    console.log(values);
    
    dispatch(filtrarPeliculas(values));
  };

  const onReset = () => {
    form.resetFields();
    dispatch(filtrarPeliculas(valorInicial));
  };

  const { generos } = useAppSelector((state) => state.generos);
  const generosSelect: selectGeneroDTO[] = generos.map((genero) => {
    return { id: genero.id, nombre: genero.nombre };
  });

  return (
    <>
      <div className="flex justify-center">
        <Form form={form} onFinish={onFinish} layout="inline" name="basic">
          <Form.Item>
            <div className="label">Titulo</div>
            <Form.Item
              wrapperCol={{ span: 32 }}
              name="titulo"
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
                options={generosSelect}
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
            <Button className="button-Ant mt-5" htmlType="submit">
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

      <ListadoPeliculas peliculas={peliculasFiltro} />
    </>
  );
}

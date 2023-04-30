import { IconMasksTheater } from "@tabler/icons-react";
import { Button, Form, Input, message, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { genero } from "./Generos.model";
import { notificacionError, notificacionSuccess } from "../Utils/Notificaciones";

export default function FormularioEditarGenero({genero} : formularioEditarGeneroProps) {

  const onFinish = async (values: genero) => {

    await axios.put(`${import.meta.env.VITE_API_URL}/generos/UpdateGenero/${genero?.id}`, values)
               .then(() => {
                  notificacionSuccess({message: "Género editado", description: "El género se editó correctamente."})
                  return navigate("/generos");
               })
               .catch(() => notificacionError({message: "Error al editar", description: "Ocurrió un error al editar el género."}));
  };

  const navigate = useNavigate();

  return (
    <div className="div-center">
      <h4 className="title">Editar Género</h4>

      <Form
        initialValues={genero}
        className="w-full"
        layout="vertical"
        name="basic"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item className="mb-1" wrapperCol={{ offset: 4, span: 16 }}>
          <div className="label">Nombre</div>

          <Form.Item
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del género.",
              },
            ]}
          >
            <Input
              prefix={<IconMasksTheater />}
              placeholder="Nombre Género"
              allowClear
            />
          </Form.Item>
        </Form.Item>

        <Form.Item className="mb-1" wrapperCol={{ offset: 4, span: 16 }}>
          <div className="label">Descripción</div>

          <Form.Item
            name="descripcion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la descripción del género.",
              },
            ]}
          >
            <TextArea placeholder="Descripción" autoSize />
          </Form.Item>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button
            className={`button-Ant me-2`}
            type="primary"
            htmlType="submit"
          >
            Editar
          </Button>

          <Button
            className="bg-gray-500 text-white"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

interface formularioEditarGeneroProps {
  genero: genero;
}
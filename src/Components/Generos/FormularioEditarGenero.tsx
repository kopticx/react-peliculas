import { IconMasksTheater } from "@tabler/icons-react";
import { Button, Form, Input } from "antd";
import css from "../Utils/custom.module.css";
import { useNavigate } from "react-router-dom";

export default function FormularioEditarGenero() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const navigate = useNavigate();

  return (
    <div className={`${css.divCenter}`}>
      <h4 className={`${css.titles}`}>Editar Género</h4>

      <Form
        className="w-full"
        layout="vertical"
        name="basic"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          wrapperCol={{offset: 4, span: 16}}
          name="nombre"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el nombre del género.",
            },
          ]}
        >
          <Input prefix={<IconMasksTheater />} placeholder="Nombre" allowClear />
        </Form.Item>

        <Form.Item
          wrapperCol={{offset: 4, span: 16}}
          name="descripcion"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la descripción del género.",
            },
          ]}
        >
          <Input.TextArea placeholder="Descripción"/>
        </Form.Item>

        <Form.Item className="mt-5" wrapperCol={{offset: 4, span: 16}}>
            <Button className={`${css.buttonLikeAntD} me-2`} type="primary" htmlType="submit">Editar</Button>

            <Button className="bg-gray-500 text-white" onClick={() => navigate(-1)}>Cancelar</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

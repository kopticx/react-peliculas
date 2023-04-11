import { IconMasksTheater } from "@tabler/icons-react";
import { Form, Input, Modal } from "antd";
import css from "../Utils/custom.module.css";
import { GeneroFormProps } from "./Generos.model";

export default function FormularioCreacionGeneros({
  open,
  onAction,
  onCancel
}: GeneroFormProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Crear Género"
      okText="Crear"
      cancelText="Cancelar"
      onCancel={onCancel}
      okButtonProps={{ className: css.buttonLikeAntD }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onAction(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el nombre del género",
            },
          ]}
        >
          <Input prefix={<IconMasksTheater />} allowClear />
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la descripción del género",
            },
          ]}
        >
          <Input.TextArea allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}


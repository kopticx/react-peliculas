import { IconMasksTheater } from "@tabler/icons-react";
import { Form, Input, Modal } from "antd";
import { generoDTO } from "./Generos.model";

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
      okButtonProps={{ className: 'button-Ant' }}
      onOk={async () => {
       await form.validateFields()
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
          <Input prefix={<IconMasksTheater />} allowClear maxLength={50}/>
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

interface GeneroFormProps {
  open: boolean;
  onAction: (values: generoDTO) => void;
  onCancel: () => void;
}
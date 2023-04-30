import { IconTicket } from "@tabler/icons-react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { cinesFormularioDTO } from "./Cines.model";
import MapView from "./MapView";

export default function FormularioCines(props: formularioCinesProps) {
  const navigate = useNavigate();

  return (
    <>
      <Form
        initialValues={props.modelo}
        wrapperCol={{ offset: 2, span: 18 }}
        className="w-full"
        layout="vertical"
        name="basic"
        style={{ maxWidth: 600 }}
        onFinish={props.onFinish}
        autoComplete="off"
      >
        <Form.Item className="mb-1">
          <div className="label">Nombre</div>

          <Form.Item
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del cine.",
              },
            ]}
          >
            <Input
              prefix={<IconTicket />}
              placeholder="Nombre Cine"
              allowClear
            />
          </Form.Item>
        </Form.Item>

        <Form.Item className="mb-1">
          <div className="label">Ubicación</div>
          
          <Form.Item
            name="ubicacion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la ubicación del cine.",
              },
            ]}
            trigger="onClick"
          >
            <MapView canClick />
          </Form.Item>

        </Form.Item>

        <Form.Item>
          <Button className="button-Ant me-2" type="primary" htmlType="submit">
            {props.buttonName}
          </Button>

          <Button
            className="bg-gray-500 text-white"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

interface formularioCinesProps {
  modelo?: cinesFormularioDTO;
  onFinish(valores: cinesFormularioDTO): void;
  buttonName: string;
}

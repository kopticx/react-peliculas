import { UploadOutlined } from "@ant-design/icons";
import { IconUser } from "@tabler/icons-react";
import { Button, DatePicker, Form, Image, Input, Upload, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actorDTO, actoresFormularioDTO } from "./Actores.model";
import TextArea from "antd/es/input/TextArea";

export default function FormularioActores(props: formularioActoresProps) {
  
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [visible, setVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  //* Seteamos la imagen de preview si tenemos una imagen en el modelo
  useEffect(() => {
    setPreviewImage(props.modelo?.fotoURL || 'https://cdn-icons-png.flaticon.com/512/2281/2281284.png');
  }, [])

  //* Funcion para convertir la imagen a base64
  const toBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  //* Funcion para previsualizar la imagen
  const beforeUpload = (file: any) => {
    toBase64(file)
    .then((result: string) => setPreviewImage(result))
    .catch(error => console.log(error));
    
    setFileList([...fileList, file]);

    return false;
  }

  //* Funcion para eliminar la imagen de la lista
  const onRemove = (file: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  }

  //* Funcion para el Form.Item
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  //* Rules del Form.Item de la imagen
  const rulesImagen=[
    {
      required: true,
      message: "Selecciona una imagen",
    }
  ]

  return (
    <div className="flex gap-24">
      <div className="w-1/4">
        <Image 
           preview={visible}
           width={250}
           height={300}
           src={previewImage}
           onClick={() => setVisible(true)}
        />
      </div>

      <div className="w-3/4">
        <Form
          initialValues={props.modelo}
          wrapperCol={{ offset: 2, span: 22 }}
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
                  message: "Por favor ingrese el nombre del actor.",
                },
              ]}
            >
              <Input
                prefix={<IconUser />}
                placeholder="Nombre Actor"
                allowClear
              />
            </Form.Item>
          </Form.Item>

          <Form.Item className="mb-1">
            <div className="label">Fecha Nacimiento: </div>

            <Form.Item
              name="fechaNacimiento"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa una fecha de nacimiento.",
                },
              ]}
            >
              <DatePicker className="w-full" format={'DD/MM/YYYY'} placeholder="Fecha Nacimiento"/>
            </Form.Item>
          </Form.Item>

          <Form.Item className="mb-1">
            <div className="label">Biografia: </div>

            <Form.Item 
              name="biografia"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa una biografia.",
                },
              ]}
            >
              <TextArea rows={5} placeholder="Biografia"></TextArea>
            </Form.Item>

          </Form.Item>

          <Form.Item className="mb-1">
            <div className="label">Foto: </div>

            <Form.Item
              name="foto"
              rules={props.modelo?.fotoURL ? [] : rulesImagen}
              getValueFromEvent={normFile}
              valuePropName="fileList"
            >
              <Upload
                listType="picture"
                defaultFileList={[...fileList]}
                onRemove={onRemove}
                beforeUpload={beforeUpload}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>

          </Form.Item>

          <Form.Item>
            <Button
              loading={uploading}
              className="button-Ant me-2"
              type="primary"
              htmlType="submit"
              onClick={() => setUploading(true)}
            >
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
      </div>
    </div>
  );
}

interface formularioActoresProps {
  modelo?: actorDTO;
  onFinish(valores: actoresFormularioDTO): void;
  buttonName: string;
}

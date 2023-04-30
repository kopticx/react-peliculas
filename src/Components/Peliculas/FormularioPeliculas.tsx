import { UploadOutlined } from "@ant-design/icons";
import { IconRating12Plus, IconUser } from "@tabler/icons-react";
import { Button, Checkbox, DatePicker, Form, Image, Input,
         Select, Transfer, Upload, UploadFile } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { peliculaFormularioDTO } from "./Peliculas.model";
import { selectGeneroDTO } from "../Generos/Generos.model";
import { cinesTransferDTO } from "../Cines/Cines.model";
import { actoresTransferDTO } from "../Actores/Actores.model";

export default function FormularioPeliculas({ modelo, onFinish, buttonName }: formularioPeliculasProps) {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [visible, setVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  //!Cines
  const [targetKeysCines, setTargetKeysCines] = useState<string[]>(modelo?.cines || []);
  const [selectedKeysCines, setSelectedKeysCines] = useState<string[]>([]);

  //* Opcines del transfer de cines
  const cines: cinesTransferDTO[] = [
    { key: "1", nombre: "Cinepolis" },
    { key: "2", nombre: "Cine Kevin" },
    { key: "3", nombre: "Cine 3" },
    { key: "4", nombre: "Cine 4" },
  ]

  const handleChangeCines = (newTargetKeys: string[]) => {
    setTargetKeysCines(newTargetKeys);
  };

  const handleSelectChangeCines = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeysCines([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  //!endCines

  //! Actores
    const [targetKeysActores, setTargetKeysActores] = useState<string[]>(modelo?.actores || []);
    const [selectedKeysActores, setSelectedKeysActores] = useState<string[]>([]);

    //* Opcines del transfer de actores
    const actores: actoresTransferDTO[] = [
        { key: "1", nombre: "Actor 1" },
        { key: "2", nombre: "Actor 2" },
        { key: "3", nombre: "Actor 3" },
        { key: "4", nombre: "Actor 4" },
    ]

    const handleChangeActores = (newTargetKeys: string[]) => {
        setTargetKeysActores(newTargetKeys);
    };

    const handleSelectChangeActores = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeysActores([...sourceSelectedKeys, ...targetSelectedKeys]);
    };
  //!endActores


  //* Seteamos la imagen de preview si tenemos una imagen en el modelo
  useEffect(() => {
    setPreviewImage( modelo?.posterUrl || "https://cdn-icons-png.flaticon.com/512/2281/2281284.png");
  }, []);

  //* Funcion para convertir la imagen a base64
  const toBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  //* Funcion para previsualizar la imagen
  const beforeUpload = (file: any) => {
    toBase64(file)
      .then((result: string) => setPreviewImage(result))
      .catch((error) => console.log(error));

    setFileList([...fileList, file]);

    return false;
  };

  //* Funcion para eliminar la imagen de la lista
  const onRemove = (file: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  //* Funcion para el Form.Item
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  //* Rules del Form.Item de el imagen
  const rulesImagen = [
    {
      required: true,
      message: "Selecciona una imagen",
    },
  ];

  //* Opciones del Select de generos
  const options: selectGeneroDTO[] = [
    { id: 1, nombre: "Comedia" },
    { id: 2, nombre: "Drama" },
    { id: 3, nombre: "Accion" },
  ];

  return (
    <div className="flex gap-24">
      <div className="w-1/4">
        <Image
          preview={visible}
          width={250}
          height={350}
          src={previewImage}
          onClick={() => setVisible(true)}
        />
      </div>

      <div className="w-3/4">
        <Form
          initialValues={modelo}
          wrapperCol={{ offset: 2, span: 22 }}
          className="w-full"
          layout="vertical"
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item className="mb-1">
            <div className="label">Titulo</div>

            <Form.Item
              name="titulo"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el nombre de la pelicula.",
                },
              ]}
            >
              <Input
                prefix={<IconUser />}
                placeholder="Nombre Pelicula"
                allowClear
              />
            </Form.Item>
          </Form.Item>

          <Form.Item
            className="mb-1 -mt-3"
            valuePropName="checked"
            name="enCines"
          >
            <Checkbox className="label">En cines</Checkbox>
          </Form.Item>

          <Form.Item className="mb-1">
            <div className="label">Trailer</div>

            <Form.Item
              name="trailer"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la url del trailer.",
                },
              ]}
            >
              <Input
                type="url"
                prefix={<IconRating12Plus />}
                placeholder="Trailer de la pelicula"
                allowClear
              />
            </Form.Item>
          </Form.Item>

          <Form.Item className="mb-1">
            <div className="label">Fecha de lanzamiento: </div>

            <Form.Item name="fechaLanzamiento">
              <DatePicker
                className="w-full"
                format={"DD/MM/YYYY"}
                placeholder="Fecha de lanzamiento"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item className="mb-1">
            <div className="label">Generos</div>

            <Form.Item
              name="generos"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione al menos un genero.",
                },
              ]}
            >
              <Select
                mode="multiple"
                fieldNames={{ label: "nombre", value: "id" }}
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={options}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item className="mb-1">
            <div className="label">Cines</div>

            <Form.Item
              name="cines"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione al menos un cine.",
                },
              ]}
            >
              <Transfer
                dataSource={cines}
                showSearch
                titles={["Disponibles", "Seleccionados"]}
                targetKeys={targetKeysCines}
                selectedKeys={selectedKeysCines}
                onChange={handleChangeCines}
                onSelectChange={handleSelectChangeCines}
                render={(item) => item.nombre}
                oneWay
                pagination
              />
            </Form.Item>
          </Form.Item>

          <Form.Item className="mb-1">
            <div className="label">Actores</div>

            <Form.Item
              name="actores"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione al menos un actor.",
                },
              ]}
            >
              <Transfer
                dataSource={actores}
                showSearch
                titles={["Disponibles", "Seleccionados"]}
                targetKeys={targetKeysActores}
                selectedKeys={selectedKeysActores}
                onChange={handleChangeActores}
                onSelectChange={handleSelectChangeActores}
                render={(item) => item.nombre}
                oneWay
                pagination
              />
            </Form.Item>
          </Form.Item>

          <Form.Item className="mb-1">
            <div className="label">Poster: </div>

            <Form.Item
              name="poster"
              rules={modelo?.posterUrl ? [] : rulesImagen}
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
              className="button-Ant me-2"
              type="primary"
              htmlType="submit"
            >
              {buttonName}
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

interface formularioPeliculasProps {
  modelo?: peliculaFormularioDTO;
  onFinish(valores: peliculaFormularioDTO): void;
  buttonName: string;
}

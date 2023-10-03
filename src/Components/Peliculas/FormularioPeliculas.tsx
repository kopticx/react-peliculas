import {
    MinusCircleOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import {IconRating12Plus, IconUser} from "@tabler/icons-react";
import {
    Button, Checkbox, DatePicker, Form, Image, Input,
    Select, Transfer, Upload, UploadFile
} from "antd";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {peliculaFormularioDTO} from "./Peliculas.model";
import {selectGeneroDTO} from "../Generos/Generos.model";
import {cinesTransferDTO} from "../Cines/Cines.model";
import {
    useAppDispatch,
    useAppSelector,
} from "../../redux/hooks/useTypedSelectors";
import {getCines} from "../../redux/slices/cineSlice";
import {getGeneros} from "../../redux/slices/generoSlice";
import {getActores} from "../../redux/slices/actorSlice";
import {selectActorDTO} from "../Actores/Actores.model";


export default function FormularioPeliculas({modelo, onFinish, buttonName}: formularioPeliculasProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getCines());
        dispatch(getGeneros());
        dispatch(getActores());
    }, []);

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [visible, setVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [uploading, setUploading] = useState(false);

    //!Cines
    const [targetKeysCines, setTargetKeysCines] = useState<string[]>(
        modelo?.cines.map((x) => x) || []
    );
    const [selectedKeysCines, setSelectedKeysCines] = useState<string[]>([]);
    const {cines} = useAppSelector((state) => state.cines);

    //* Opcines del transfer de cines
    const transferCines: cinesTransferDTO[] = cines.map((cine) => {
        return {key: cine.id?.toString(), nombre: cine.nombre};
    });

    const handleChangeCines = (newTargetKeys: string[]) => {
        setTargetKeysCines(newTargetKeys);
    };

    const handleSelectChangeCines = (
        sourceSelectedKeys: string[],
        targetSelectedKeys: string[]
    ) => {
        setSelectedKeysCines([...sourceSelectedKeys, ...targetSelectedKeys]);
    };
    //!endCines

    //! Actores
    const {actores} = useAppSelector((state) => state.actores);
    let actoresSelect: selectActorDTO[] = actores.map((actor) => {
        return {id: actor.id, nombre: actor.nombre};
    });

    const onChangeActores = (value: any) => {
        actoresSelect = actoresSelect.filter((actor) => actor.id !== value);
    }
    //!endActores

    //* Seteamos la imagen de preview si tenemos una imagen en el modelo
    useEffect(() => {
        setPreviewImage(
            modelo?.posterUrl ||
            "https://cdn-icons-png.flaticon.com/512/2281/2281284.png"
        );
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
    const onRemove = (file: any): void => {
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
    const {generos} = useAppSelector((state) => state.generos);
    const generosSelect: selectGeneroDTO[] = generos.map((genero) => {
        return {id: genero.id, nombre: genero.nombre};
    });

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
                    form={form}
                    initialValues={modelo}
                    wrapperCol={{offset: 2, span: 22}}
                    className="w-full"
                    layout="vertical"
                    name="basic"
                    style={{maxWidth: 600}}
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
                                prefix={<IconUser/>}
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
                                prefix={<IconRating12Plus/>}
                                placeholder="Trailer de la pelicula"
                                allowClear
                            />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className="mb-1">
                        <div className="label">Resumen</div>

                        <Form.Item
                            name="resumen"
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese el resumen de la pelicula.",
                                },
                            ]}
                        >
                            <Input.TextArea
                                autoSize
                                rows={2}
                                placeholder="Resumen de la pelicula"
                                allowClear
                            />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className="mb-1">
                        <div className="label">Fecha de estreno:</div>

                        <Form.Item name="fechaEstreno">
                            <DatePicker
                                className="w-full"
                                format={"DD/MM/YYYY"}
                                placeholder="Fecha de estreno"
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
                                showSearch
                                mode="multiple"
                                fieldNames={{label: "nombre", value: "id"}}
                                allowClear
                                style={{width: "100%"}}
                                placeholder="Please select"
                                options={generosSelect}
                                filterOption={(input, option) =>
                                    option!.nombre.toLowerCase().includes(input.toLowerCase())
                                }
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
                                dataSource={transferCines}
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

                    <Form.List
                        name="actores"
                        rules={[
                            {
                                validator: async (_, actores) => {
                                    if (!actores || actores.length < 1) {
                                        return Promise.reject(new Error('Al menos un actor'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, {add, remove}, {errors}) => (
                            <>
                                {fields.map(({key, name, ...restField}) => (
                                    <Form.Item key={key} className="w-full -mb-7">
                                        <div className="flex gap-5">
                                            <Form.Item className="w-1/2">
                                                <div className="label">Actor</div>

                                                <Form.Item {...restField} name={[name, "id"]}>
                                                    <Select
                                                        showSearch
                                                        fieldNames={{label: "nombre", value: "id"}}
                                                        allowClear
                                                        placeholder="Please select"
                                                        options={actoresSelect}
                                                        filterOption={(input, option) =>
                                                            option!.nombre
                                                                .toLowerCase()
                                                                .includes(input.toLowerCase())
                                                        }
                                                        onChange={onChangeActores}
                                                    />
                                                </Form.Item>
                                            </Form.Item>

                                            <Form.Item className="w-1/2">
                                                <div className="label">Nombre Personaje</div>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "personaje"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "El nombre del personaje es requerido",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Nombre Personaje"/>
                                                </Form.Item>
                                            </Form.Item>

                                            <Form.Item className="w-1/6">
                                                <MinusCircleOutlined
                                                    className="mt-7"
                                                    onClick={() => remove(name)}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Form.Item>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block>
                                        <PlusOutlined/> Agregar Personaje
                                    </Button>
                                </Form.Item>

                                <Form.Item className="-mt-6">
                                    <Form.ErrorList className="text-red-500" errors={errors}/>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item className="-mt-7 mb-1">
                        <div className="label">Poster:</div>

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
                                <Button icon={<UploadOutlined/>}>Select File</Button>
                            </Upload>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={uploading}
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

    onFinish(valores: any): void;

    buttonName: string;
}

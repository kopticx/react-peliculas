import { Button, Checkbox, Form, Input, Upload, UploadFile } from "antd";
import css from "./Auth.module.css";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/useTypedSelectors";
import { signIn } from "../../redux/slices/authSlice";
import { sigInToFormData } from "./AuthUtils";
import { Navigate, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { autenticado } = useAppSelector((state) => state.autenticacion);

  if(autenticado){
    return <Navigate to='/' />
  }

  const beforeUpload = (file: any) => {
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

  const onFinish = (values: any) => {

    values = {
        ...values,
        foto: values.foto?.[0].originFileObj
    }

    const data = sigInToFormData(values);

    dispatch(signIn(data))

    return navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Peliculas
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Registrate
          </h1>
          <Form onFinish={onFinish} name="login" className="md:space-y-4 w-full">
            <Form.Item className="-mb-5">
              <div className={css.labelInputs}>Email</div>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Por favor ingresa tu correo" },
                ]}
              >
                <Input
                  className={`${css.bgInputs} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 w-full p-2.5`}
                  type="email"
                  allowClear
                />
              </Form.Item>
            </Form.Item>

            <Form.Item className="-mb-5">
              <div className={css.labelInputs}>UserName</div>

              <Form.Item
                name="userName"
                rules={[
                  { required: true, message: "Por favor ingresa tu nombre se usuario" },
                ]}
              >
                <Input
                  className={`${css.bgInputs} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 w-full p-2.5`}
                  allowClear
                />
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <div className={css.labelInputs}>Password</div>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu contraseña",
                  },
                ]}
              >
                <Input.Password
                  className={`${css.bgInputs} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 w-full p-2.5`}
                  allowClear
                />
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <div className="label">Foto: </div>

              <Form.Item
                name="foto"
                rules={[
                  {
                    required: true,
                    message: "Selecciona una imagen",
                  },
                ]}
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

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 h-auto"
                type="primary"
                htmlType="submit"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

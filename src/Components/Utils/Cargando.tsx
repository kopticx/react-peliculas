import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Cargando() {
  return (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 200 }} spin />} size="large" />
  );
}
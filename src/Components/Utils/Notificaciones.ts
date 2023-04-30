import { notification } from "antd";

export const notificacionSuccess = ({message, description} : notificacionProps ) => {
    notification.success({
      message,
      description,
      placement: "bottomRight",
      duration: 3,
    });
}

export const notificacionError = ({message, description}: notificacionProps) => {
    notification.error({
      message,
      description,
      placement: "bottomRight",
      duration: 3,
    });
}

interface notificacionProps {
    message: string;
    description: string;
}
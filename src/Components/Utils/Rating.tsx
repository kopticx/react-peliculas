import { Form, Rate } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/useTypedSelectors";
import { notificacionError, notificacionSuccess } from "./Notificaciones";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { postVotoUsuario } from "../../redux/slices/peliculaSlice";

export default function Rating({ disabled, votoUsuario }: RatingProps) {

  const dispatch = useAppDispatch();
  const { autenticado } = useAppSelector((state) => state.autenticacion);
  const {id} = useParams();
  
  const onChange = async (value: any) => {

    if (!autenticado) {
      notificacionError({ message: "No se pudo puntuar la pelicula", description: "Debes iniciar sesion para puntuar la pelicula" });
    }

    const body = {
      peliculaId: Number(id),
      puntuacion: value
    }

    const response = await dispatch(postVotoUsuario(body));

    if(response.meta.requestStatus === 'fulfilled'){
      notificacionSuccess({ message: "Pelicula puntuada", description: "Gracias por puntuar la pelicula" });
    }
  };

  return (
    <Form fields={[
      {
        name: "puntuacion",
        value: votoUsuario
      }
    ]}>
      <Form.Item
        name="puntuacion"
        rules={[{ required: true, message: "Debes puntuar la pelicula" }]}
      >
        <Rate
          disabled={disabled}
          style={{ color: "#0066F1" }}
          onChange={onChange}
        />
      </Form.Item>
    </Form>
  );
}

interface RatingProps {
  disabled?: boolean;
  votoUsuario?: number;
}

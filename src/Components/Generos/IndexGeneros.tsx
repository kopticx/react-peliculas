import { Button } from "antd";
import { useState } from "react";
import css from '../Utils/custom.module.css';
import CrearGenero from "./CrearGenero";
import { generoDTO } from "./Generos.model";
import ListadoGeneros from "./ListadoGeneros";

export default function IndexGeneros() {

  const [open, setOpen] = useState(false);

  const onCreate = (values: generoDTO) => {
    console.log('Received values of form Creating: ', values);
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  }

  return (
    <>
      <div className="flex justify-between mt-5">
        <Button className={`${css.buttonLikeAntD} order-last me-3`} onClick={() => {setOpen(true)}}>Crear Género</Button>
        <h3 className="text-3xl font-bold text-indigo-500 order-2">Géneros</h3>
        <p></p>
      </div>

      <CrearGenero open={open} onAction={onCreate} onCancel={onCancel} />

      <div className="p-3">
        <div className={`${css.containerWhite}`}>
          <ListadoGeneros />
        </div>
      </div>
    </>

  );
}

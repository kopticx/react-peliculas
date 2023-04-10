import { useParams } from "react-router-dom";

export default function Editargenero() {

  const {id}: any = useParams();

  console.log(id);
  

  return (
    <>
      <h3>Editar Genero</h3>
    </>
  );
}

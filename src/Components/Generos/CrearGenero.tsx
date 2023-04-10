import { Button } from "antd";
import css from '../Utils/custom.module.css'
import { useNavigate } from "react-router-dom";

export default function CrearGenero() {
    const navigate = useNavigate();

    return (
        <>
            <h3>Crear Genero</h3>

            <Button className={css.buttonLikeAntD} onClick={() => navigate('/generos')}>Salvar</Button>
        </>
    )
}
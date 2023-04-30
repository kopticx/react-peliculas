import { Button } from "antd";

export default function TituloGenerico({ titulo, accion, buttonText }: tituloGenericoProps) {

    return (
        <div className="flex justify-between mt-5 mb-5">
            <p className="w-28"></p>
            <h3 className="text-3xl font-bold text-indigo-500 text-center w-full">{titulo}</h3>
            <Button type="primary" className="button-Ant w-auto" onClick={accion}>
                {buttonText}
            </Button>
        </div>
    );
}

interface tituloGenericoProps {
    titulo: string;
    accion(): void;
    buttonText: string
}
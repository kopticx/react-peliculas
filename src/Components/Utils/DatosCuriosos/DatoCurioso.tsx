export default function DatoCurioso({ urlImagen, dato }: datoCuriosoProps) {
    return (
        <div>
            <img src={urlImagen} />
            <p>{dato}</p>
        </div>
    )
}

interface datoCuriosoProps {
    urlImagen: string;
    dato: string;
}
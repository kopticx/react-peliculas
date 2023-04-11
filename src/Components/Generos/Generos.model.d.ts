export interface genero {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface generoDTO {
    nombre: string;
    descripcion: string;
}

export interface GeneroFormProps {
    open: boolean;
    onAction: (values: generoDTO) => void;
    onCancel: () => void;
  }
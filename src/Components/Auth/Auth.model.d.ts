export type claim = {
  nombre: string;
  valor: string;
};

export type registro = {
  email: string;
  password: string;
  userName: string;
  foto: File;
};

export type login = {
  email: string;
  password: string;
}

export type respuestaAutenticacion = {
    token: string;
    expiracion: Date;
    fotoUsuario: string;
}
import { claim, registro, respuestaAutenticacion } from "./Auth.model";

export function sigInToFormData(registro: registro): FormData {
    const formData = new FormData();

    formData.append('email', registro.email);
    formData.append('userName', registro.userName);
    formData.append('password', registro.password);

    if (registro.foto){
        formData.append('foto', registro.foto);
    }

    return formData;
}

const llaveToken = 'token';
const llaveExpiracion = 'token-expiracion'

export function guardarTokenLocalStorage(autenticacion:  respuestaAutenticacion) {
    console.log(autenticacion);
    
    localStorage.setItem(llaveToken, autenticacion.token);
    localStorage.setItem(llaveExpiracion, autenticacion.expiracion.toString());
}

export function obtenerClaims() : claim[] {
    const token = localStorage.getItem(llaveToken);

    if (!token){
        return [];
    }

    const expiracion = localStorage.getItem(llaveExpiracion)!;
    const expiracionFecha = new Date(expiracion);

    if(expiracionFecha <= new Date()){
        logout();
        return [];
    }

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    const response: claim[] = [];

    for (const claim in dataToken){
        response.push({nombre: claim, valor: dataToken[claim]});
    }

    return response;
}

export function logout() {
    localStorage.removeItem(llaveToken);
    localStorage.removeItem(llaveExpiracion);
}
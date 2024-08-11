import { Areas } from "./areas.model";
import { Ciudades } from "./ciudades.model";
import { Perfiles } from "./perfiles.model";

export class Usuarios
{
    id: number;
    cCedula: string;
    cNombres: string;
    cApellidos: string;
    fFecNacimiento: Date;
    idCodPerfil: number;
    perfiles?: Perfiles;
    idArea: number;
    areas?: Areas;
    idCiudad: number;
    ciudades?: Ciudades;
    cDirecciones: string;
    fFechaCreacion: Date;
    fFechaModificacion: Date;
  
    constructor()
    {
      this.id = 0;
      this.cCedula = '';
      this.cNombres = '';
      this.cApellidos = '';
      this.fFecNacimiento = new Date();
      this.idCodPerfil = 0;
      this.idArea = 0;
      this.idCiudad = 0;
      this.cDirecciones = '';
      this.fFechaCreacion = new Date();
      this.fFechaModificacion = new Date();
    }
}
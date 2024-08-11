import { Tecnicos } from "./tecnicos.model";

export class Categorias {
    id: number;
    cCategoria: string;
    idTecnicoDefault: number;
    tecnicos?: Tecnicos;
  
    constructor() {
      this.id = 0;
      this.cCategoria = '';
      this.idTecnicoDefault = 0;
    }
  }
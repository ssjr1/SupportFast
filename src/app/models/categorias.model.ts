import { Tecnicos } from "./tecnicos.model";

export class Categorias {
    id: number;
    c_Categoria: string;
    id_TecnicoDefault: number;
    tecnicos?: Tecnicos;
  
    constructor(id: number, c_Categoria: string,id_TecnicoDefault: number) {
      this.id = id;
      this.c_Categoria = c_Categoria;
      this.id_TecnicoDefault = id_TecnicoDefault;
    }
  }
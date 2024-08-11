import { Categorias } from "./categorias.model";

export class SubCategorias {
    id: number;
    idCategoria: number;
    categorias?: Categorias;
    cSubCategoria: string;
  
    constructor() {
      this.id = 0;
      this.idCategoria = 0;
      this.cSubCategoria = '';
    }
  }
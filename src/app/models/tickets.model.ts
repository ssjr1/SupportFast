import { Categorias } from "./categorias.model";
import { Estados } from "./estados.model";
import { Soluciones } from "./soluciones.model";
import { SubCategorias } from "./subcategorias.model";
import { Tecnicos } from "./tecnicos.model";

export class Tickets {
    id: number;
    cDescripcion: string;
    idCategoria: number;
    categorias?: Categorias;
    idSubCategoria: number;
    subCategorias?: SubCategorias;
    idTecnicoAsignado: number;
    tecnicos?: Tecnicos;
    idSolucion: number;
    soluciones?: Soluciones;
    idEstado: number;
    estados?: Estados;
    fFechaCreacion: Date;
    fFechaUltimaGestion: Date;
    fFechaCierre: Date;
  
    constructor() {
      this.id = 0;
      this.cDescripcion = '';
      this.idCategoria = 0;
      this.idSubCategoria = 0;
      this.idTecnicoAsignado = 0;
      this.idSolucion = 0;
      this.idEstado = 0;
      this.fFechaCreacion = new Date();
      this.fFechaUltimaGestion = new Date();
      this.fFechaCierre = new Date();
    }
  }
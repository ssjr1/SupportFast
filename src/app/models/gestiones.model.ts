import { Categorias } from "./categorias.model";
import { Estados } from "./estados.model";
import { Soluciones } from "./soluciones.model";
import { SubCategorias } from "./subcategorias.model";
import { Tecnicos } from "./tecnicos.model";
import { Tickets } from "./tickets.model";

export class Gestiones {
    id: number;
    idTicket: number;
    ticket?: Tickets;
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
    fFechaCierre: Date;
  
    constructor() {
      this.id = 0;
      this.idTicket = 0;
      this.idCategoria = 0;
      this.idSubCategoria = 0;
      this.idTecnicoAsignado = 0;
      this.idSolucion = 0;
      this.idEstado = 0;
      this.fFechaCreacion = new Date();
      this.fFechaCierre = new Date();
    }
  }
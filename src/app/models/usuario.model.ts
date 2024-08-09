export class usuario {
    id: number;
    nombre: string;
    email: string;
    rolId: number;
  
    constructor(id: number, nombre: string, email: string, rolId: number) {
      this.id = id;
      this.nombre = nombre;
      this.email = email;
      this.rolId = rolId;
    }
  }
  
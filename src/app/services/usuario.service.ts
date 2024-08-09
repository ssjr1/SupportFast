import { Injectable } from '@angular/core';
import { usuario } from '../models/usuario.model';
import { rol } from '../models/rol.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: usuario[] = [
    new usuario(1, 'Juan Perez', 'juan.perez@example.com', 1),
    new usuario(2, 'Maria Lopez', 'maria.lopez@example.com', 2)
  ];

  private roles: rol[] = [
    new rol(1, 'Admin'),
    new rol(2, 'User')
  ];

  constructor() {}

  getUsuarios(): usuario[] {
    return this.usuarios;
  }

  getRoles(): rol[] {
    return this.roles;
  }
}

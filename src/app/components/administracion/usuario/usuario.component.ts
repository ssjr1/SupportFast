import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { usuario } from '../../../models/usuario.model';
import { rol } from '../../../models/rol.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit {
  usuarios: usuario[] = [];
  roles: rol[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getUsuarios();
    this.roles = this.usuarioService.getRoles();
  }

  getRolName(rolId: number): string {
    const rol = this.roles.find(r => r.id === rolId);
    return rol ? rol.nombre : 'Unknown';
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rol } from '../../../models/rol.model';
import { DataService } from '../../../services/data.service';
import { usuario } from '../../../services/usuario.model';

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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.usuarios = this.dataService.getUsuarios();
    this.roles = this.dataService.getRoles();
  }

  getRolName(rolId: number): string {
    const rol = this.roles.find(r => r.id === rolId);
    return rol ? rol.nombre : 'Unknown';
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card'
import { UsuariosService } from '../../../services/usuarios.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Usuarios } from '../../../models/usuarios.model';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports:
  [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit {
  displayedColumns: string[] =
  [
    'id',
    'cedula',
    'nombres',
    'apellidos',
    'fecNacimiento',
    'perfil',
    'area',
    'ciudad',
    'direcciones',
    'fechaCreacion',
    'fechaModificacion',
    'actions'
  ];
  dataSource = new MatTableDataSource<Usuarios>();

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe(
      (usuarios: Usuarios[]) => {
        this.dataSource.data = usuarios;
      },
      (error) => {
        console.error('Error fetching usuarios', error);
      }
    );
  }
  editUser(id: number): void {
    // Lógica para editar el usuario
    console.log('Edit user with ID:', id);
  }

  deleteUser(id: number): void {
    // Lógica para eliminar el usuario
    this.usuariosService.deleteUsuario(id).subscribe(
      () => this.loadUsuarios(),
      error => console.error('Error al eliminar usuario', error)
    );
  }
}

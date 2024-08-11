import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Perfiles } from '../../../models/perfiles.model';
import { PerfilesService } from '../../../services/perfiles.service';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { NuevoPerfilComponent } from './nuevo-perfil/nuevo-perfil.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports:
  [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent
{
  dataSource = new MatTableDataSource<Perfiles>();
  displayedColumns: string[] = ['id', 'c_Perfil', 'actions'];

  constructor
  (
    private perfilesService: PerfilesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPerfiles();
  }

  loadPerfiles(): void {
    this.perfilesService.getPerfiles().subscribe({
      next: (perfiles: Perfiles[]) => {
        this.dataSource.data = perfiles;
      },
      error: (error) => {
        console.error('Error al cargar los perfiles:', error);
      }
    });
    
  }

  addNewPerfil(): void {
    const dialogRef = this.dialog.open(NuevoPerfilComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPerfiles(); // Reload profiles after adding a new one
      }
    });
  }

  editPerfil(id: number): void {
    this.perfilesService.getPerfil(id).subscribe
    (
      perfil =>
      {
        const dialogRef = this.dialog.open
        (
          EditarPerfilComponent,
          {
            data: perfil,
            width: '400px'
          }
        );
        dialogRef.afterClosed().subscribe
        (
          result =>
          {
            if(result)
            {
              this.perfilesService.updatePerfil(result.id, result).subscribe(() =>
              {
                this.loadPerfiles();
              });
            }
          }
        )
      }
    )
  }

  deletePerfil(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este perfil?')) {
      this.perfilesService.deletePerfil(id).subscribe(
        () => {
          this.loadPerfiles(); // Recargar la lista de perfiles después de eliminar uno
        },
        (error) => {
          console.error('Error al eliminar el perfil:', error);
        }
      );
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

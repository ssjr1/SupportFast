import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SolucionesService } from '../../../services/soluciones.service';
import { Soluciones } from '../../../models/soluciones.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NuevaSolucionComponent } from './nueva-solucion/nueva-solucion.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { EditarSolucionComponent } from './editar-solucion/editar-solucion.component';

@Component({
  selector: 'app-solucion',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './solucion.component.html',
  styleUrls: ['./solucion.component.scss']
})
export class SolucionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'c_Solucion', 'l_Solucion_Definitiva', 'acciones'];
  dataSource = new MatTableDataSource<Soluciones>([]);

  constructor(
    private solucionesService: SolucionesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getSoluciones();
  }

  getSoluciones(): void {
    this.solucionesService.getSoluciones().subscribe({
      next: (soluciones: Soluciones[]) => {
        this.dataSource.data = soluciones;
      },
      error: (error) => {
        console.error('Error al cargar las soluciones:', error);
      }
    });
  }

  addNewSolucion(): void {
    const dialogRef = this.dialog.open(NuevaSolucionComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSoluciones();
      }
    });
  }

  editSolucion(element: Soluciones): void {
    const dialogRef = this.dialog.open(EditarSolucionComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSoluciones(); // Recargar soluciones después de la edición
      }
    });
  }

  deleteSolucion(id: number): void {
    this.solucionesService.deleteSolucion(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(solucion => solucion.id !== id);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
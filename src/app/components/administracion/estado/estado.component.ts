import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditarEstadoComponent } from './editar-estado/editar-estado.component';
import { EstadosService } from '../../../services/estados.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Estados } from '../../../models/estados.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NuevoEstadoComponent } from './nuevo-estado/nuevo-estado.component';

@Component({
  selector: 'app-estado',
  standalone: true,
  imports:
  [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './estado.component.html',
  styleUrl: './estado.component.scss'
})
export class EstadoComponent
{
  displayedColumns: string[] = ['id', 'c_Estado', 'actions'];
  dataSource = new MatTableDataSource<Estados>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private estadosService: EstadosService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEstados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEstados(): void {
    this.estadosService.getEstados().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Error al obtener los estados');
      }
    });
  }

  editEstado(id: number): void {
    this.estadosService.getEstado(id).subscribe(estado => {
      const dialogRef = this.dialog.open(EditarEstadoComponent, {
        data: estado,
        width: '400px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.estadosService.updateEstado(result.id, result).subscribe(() => {
            this.loadEstados(); // Recargar la lista después de actualizar
          });
        }
      });
    });
  }

  deleteEstado(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este estado?')) {
      this.estadosService.deleteEstado(id).subscribe(() => {
        this.loadEstados(); // Recargar la lista después de eliminar
      });
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addNewEstado(): void {
    const dialogRef = this.dialog.open(NuevoEstadoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEstados(); // Recargar la lista después de agregar un nuevo estado
      }
    });
  }
}

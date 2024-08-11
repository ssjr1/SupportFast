import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CiudadesService } from '../../../services/ciudades.service';
import { Ciudades } from '../../../models/ciudades.model';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { EditarCiudadComponent } from './editar-ciudad/editar-ciudad.component';
import { NuevaCiudadComponent } from './nueva-ciudad/nueva-ciudad.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ciudad',
  standalone: true,
  imports:
  [
    MatTableModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './ciudad.component.html',
  styleUrl: './ciudad.component.scss'
})
export class CiudadComponent
{
  displayedColumns: string[] =
  [
    'id',
    'c_Ciudad',
    'actions'
  ];
  dataSource = new MatTableDataSource<Ciudades>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _ciudadesService: CiudadesService, public dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadCiudades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCiudades(): void {
    this._ciudadesService.getCiudades().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Ocurrió un error al obtener las ciudades.');
      },
      complete: () => {
        console.info('Obtención de Ciudades completa');
      }
    });
  }
  addNewCiudad(): void {
    const dialogRef = this.dialog.open(NuevaCiudadComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._ciudadesService.createCiudad(result).subscribe(() => {
          this.loadCiudades(); // Reload the areas list
        });
      }
    });
  }

  editCiudad(id: number): void {
    this._ciudadesService.getCiudad(id).subscribe(ciudad => {
      const dialogRef = this.dialog.open(EditarCiudadComponent, {
        width: '400px',
        data: ciudad
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this._ciudadesService.updateCiudad(result.id, result).subscribe(() => {
            this.loadCiudades();
          });
        }
      });
    });
  }

  deleteCiudad(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta ciudad?')) {
      this._ciudadesService.deleteCiudad(id).subscribe(() => {
        this.loadCiudades(); // Recargar la lista después de eliminar una ciudad
      });
    }
  }
  // Método de filtro
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
}
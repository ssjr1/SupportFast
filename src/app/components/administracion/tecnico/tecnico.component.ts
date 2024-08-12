import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { Tecnicos } from '../../../models/tecnicos.model';
import { TecnicosService } from '../../../services/tecnicos.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NuevoTecnicoComponent } from './nuevo-tecnico/nuevo-tecnico.component';
import { EditarTecnicoComponent } from './editar-tecnico/editar-tecnico.component';

@Component({
  selector: 'app-tecnico',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,],
  templateUrl: './tecnico.component.html',
  styleUrl: './tecnico.component.scss'
})
export class TecnicoComponent {

  tecnico: Tecnicos[] = [];
  displayedColumns: string[] = ['id', 'c_Tecnico','actions'];
  dataSource = new MatTableDataSource<Tecnicos>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _tecnicosService: TecnicosService, private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadTecnicos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTecnicos(): void {
    this._tecnicosService.getTecnicos().subscribe({
      next: data => {
        console.log(data);
        this.tecnico = data;
        this.dataSource.data = this.tecnico;
        this.cdr.detectChanges();
      },
      error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('Obtención de Tecnico completa');
      }
    });
  }

  addNewTecnico(): void {
    const dialogRef = this.dialog.open(NuevoTecnicoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._tecnicosService.createTecnico(result).subscribe(() => {
          this.loadTecnicos(); // Reload the Tecnico list
        });
      }
    });
  }

  editTecnico(id: number): void {
    this._tecnicosService.getTecnico(id).subscribe(tecnico => {
      const dialogRef = this.dialog.open(EditarTecnicoComponent, {
        width: '400px',
        data: tecnico
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._tecnicosService.updateTecnico(result.id, result).subscribe(() => {
            this.loadTecnicos(); // Recargar la lista después de actualizar
          });
        }
      });
    });
  }

  deleteTecnico(id: number): void {
    if (confirm('¿Estás seguro de eliminar este tecnico?')) {
      this._tecnicosService.deleteTecnico(id).subscribe(() => {
        this.loadTecnicos(); // Recargar la lista después de eliminar
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
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Areas } from '../../../models/areas.model';
import { AreasService } from '../../../services/areas.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NuevaAreaComponent } from './nueva-area/nueva-area.component';
import { MatIconModule } from '@angular/material/icon';
import { EditarAreaComponent } from './editar-area/editar-area.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-area',
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
    MatFormFieldModule,
  ],
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent {
  area: Areas[] = [];
  displayedColumns: string[] = [
    'id',
    'c_Area',
    'actions'
  ];
  dataSource = new MatTableDataSource<Areas>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _areasService: AreasService, private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadAreas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAreas(): void {
    this._areasService.getAreas().subscribe({
      next: data => {
        console.log(data);
        this.area = data;
        this.dataSource.data = this.area;
        this.cdr.detectChanges();
      },
      error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('Obtención de Áreas completa');
      }
    });
  }

  addNewArea(): void {
    const dialogRef = this.dialog.open(NuevaAreaComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._areasService.createArea(result).subscribe(() => {
          this.loadAreas(); // Reload the areas list
        });
      }
    });
  }

  editArea(id: number): void {
    this._areasService.getArea(id).subscribe(area => {
      const dialogRef = this.dialog.open(EditarAreaComponent, {
        width: '400px',
        data: area
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._areasService.updateArea(result.id, result).subscribe(() => {
            this.loadAreas(); // Recargar la lista después de actualizar
          });
        }
      });
    });
  }

  deleteArea(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta área?')) {
      this._areasService.deleteArea(id).subscribe(() => {
        this.loadAreas(); // Recargar la lista después de eliminar
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
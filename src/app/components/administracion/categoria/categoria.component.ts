import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Categorias } from '../../../models/categorias.model';
import { NuevaCategoriaComponent } from './nueva-categoria/nueva-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [ MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  categoria: Categorias[] = [];
  displayedColumns: string[] = ['id','c_Categoria','id_TecnicoDefault','actions'];
  dataSource = new MatTableDataSource<Categorias>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _categoriasService: CategoriasService, private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadCategorias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCategorias(): void {
    this._categoriasService.getCategorias().subscribe({
      next: data => {
        console.log(data);
        this.categoria = data;
        this.dataSource.data = this.categoria;
        this.cdr.detectChanges();
      },
      error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('Obtención de Categoria completa');
      }
    });
  }

  addNewCategoria(): void {
    const dialogRef = this.dialog.open(NuevaCategoriaComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._categoriasService.createCategoria(result).subscribe(() => {
          this.loadCategorias(); // Reload the Categoria list
        });
      }
    });
  }

  editCategoria(id: number): void {
    this._categoriasService.getCategoria(id).subscribe(categoria => {
      const dialogRef = this.dialog.open(EditarCategoriaComponent, {
        width: '400px',
        data: categoria
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._categoriasService.updateCategoria(result.id, result).subscribe(() => {
            this.loadCategorias(); // Recargar la lista después de actualizar
          });
        }
      });
    });
  }

  deleteCategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta Categoria?')) {
      this._categoriasService.deleteCategoria(id).subscribe(() => {
        this.loadCategorias(); // Recargar la lista después de eliminar
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

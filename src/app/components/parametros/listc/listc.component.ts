import { Component, ViewChild } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Categoria } from '../../../modelos/Categoria';
import { CategoriaService } from '../../../service/categoria.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-listc',
  standalone: true,
  imports: [RouterOutlet, DatePipe, RouterLink, CommonModule, MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule, MatPaginator, MatSort, MatFormFieldModule, MatTableModule, MatInputModule, MatCardModule],
  templateUrl: './listc.component.html',
  styleUrl: './listc.component.scss'
})
export class ListcComponent {
  lstcategoria: Categoria[] = [];
  dataSource: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'descripcion', 'estado', 'acciones'];

  constructor(private _categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource<Categoria>(this.lstcategoria);
  }

  ngOnInit() {
    this.obtenerCategoria();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  obtenerCategoria() {
    this._categoriaService.getCategoria().subscribe({
      next: data => {
        console.log(data);
        this.lstcategoria = data;
        this.dataSource.data = data;
      }
    });
  }

  eliminar(id: number) {
    this._categoriaService.eliminarCategoria(id).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        this.obtenerCategoria();
        console.info('obtener Categorias');
        this.snackBar.open('Categoria eliminada', 'Cerrar', {
          duration: 3000, // Duración del snackbar en milisegundos (opcional)
          verticalPosition: 'top'

        });
      }
    });
  }

  editar(id: number) {

  }
}

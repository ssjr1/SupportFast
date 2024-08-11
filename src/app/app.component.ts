import { Component } from '@angular/core';
import { CategoriaComponent } from './components/parametros/categoria/categoria.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { ListcComponent } from './components/parametros/listc/listc.component';
import { EstadoComponent } from './components/parametros/estado/estado.component';
import { ListaEstadoComponent } from './components/parametros/lista-estado/lista-estado.component';


@Component
  (
    {
      selector: 'app-root',
      standalone: true,
      imports:
        [
          RouterOutlet, ListcComponent, CategoriaComponent, EstadoComponent, ListaEstadoComponent,
          RouterLink, MatButtonModule, MatToolbarModule, MatIconModule, MatPaginator
        ],
      templateUrl: './app.component.html',
      styleUrl: './app.component.scss'
    }
  )
export class AppComponent {
  parametro!: string;

}

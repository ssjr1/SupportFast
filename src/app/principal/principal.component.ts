import { Component, computed, signal } from '@angular/core';

/* Importaciones de Material Angular */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ModulosNavegacionComponent } from "./modulos-navegacion/modulos-navegacion.component";
import { RouterOutlet } from '@angular/router';
/*  */



@Component
(
  {
    selector: 'app-principal',
    standalone: true,
    imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    ModulosNavegacionComponent,
    RouterOutlet
],
    templateUrl: './principal.component.html',
    styleUrl: './principal.component.scss'
  }
)
export class PrincipalComponent
{
  /* Creación de una variable que usa propiedades signal para
  contraer o expandir a través del botón de menú que esta en la
  barra superior la columna de navegación */
  collapsed = signal(false);


  sidenavWidth = computed
  (
    () => this.collapsed() ? '65px' : '250px'
  );
}

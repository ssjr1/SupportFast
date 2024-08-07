import { Component, computed, Input, signal } from '@angular/core';

/* Importaciones para Material Angular */
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from "../menu-item/menu-item.component";

/* Creación de variables para los modulos del sistema */
export type menuItem =
{
  icon: string;
  label: string;
  route: string;
  subItems?: menuItem[];
};

@Component
(
  {
    selector: 'app-modulos-navegacion',
    standalone: true,
    imports: [
    MatListModule,
    MatIconModule,
    RouterModule,
    MenuItemComponent
],
    templateUrl: './modulos-navegacion.component.html',
    styleUrl: './modulos-navegacion.component.scss'
  }
)
export class ModulosNavegacionComponent
{

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean)
  {
    this.sideNavCollapsed.set(val);
  }

  /* Creacion de variable de tipo array para crear los modulos de navegacion */
  menuItems = signal<menuItem[]>
  (
    [
      {
        icon: 'settings',
        label: 'Administración',
        route: 'administracion',
        subItems:
        [
          {
            icon: 'person',
            label: 'Usuario',
            route: 'usuario'
          },
          {
            icon: 'support_agent',
            label: 'Tecnico',
            route: 'tecnico'
          },
          {
            icon: 'supervisor_account',
            label: 'Perfil',
            route: 'perfil'
          },
          {
            icon: 'place',
            label: 'Area',
            route: 'area'
          },
          {
            icon: 'location_city',
            label: 'Ciudad',
            route: 'ciudad'
          },
          {
            icon: 'check_circle',
            label: 'Estado',
            route: 'estado'
          },
          {
            icon: 'category',
            label: 'Categoria',
            route: 'categoria'
          },
          {
            icon: 'format_list_bulleted',
            label: 'Subcategoria',
            route: 'subcategoria'
          }
        ]
      },
      {
        icon: 'confirmation_number',
        label: 'Ticket',
        route: 'ticket',
        subItems:
        [
          {
            icon: 'add',
            label: 'Nuevo Ticket',
            route: 'nuevo-ticket'
          }
        ]
      },
      {
        icon: 'bar_chart',
        label: 'Reporte',
        route: 'reporte'
      },
      {
        icon: 'logout',
        label: 'Desconectarse',
        route: 'salir'
      }
    ]
  );

  profilePicSize = computed
  (
    () => this.sideNavCollapsed() ? '32' : '100'
  );
}

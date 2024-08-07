import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { menuItem } from '../modulos-navegacion/modulos-navegacion.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component
(
  {
    selector: 'app-menu-item',
    standalone: true,
    animations:
    [
      trigger
      (
        'expandContractMenu',
      [
        transition
        (
          ':enter',
          [
            style(
              {
                opacity: 0,
                height: '0px'
              }
            ),
            animate
            (
              '500ms ease-in-out',
              style
              (
                {
                  opacity: 1, height: '*'
                }
              )
            )
          ]
        ),
        transition
        (
          ':leave',
          [
            animate
            (
              '500ms ease-in-out',
              style
              (
                {
                  opacity: 0,
                  height: '0px'
                }
              )
            )
          ]
        )
      ]
    )
    ],
    imports:
    [
      CommonModule,
      MatListModule,
      RouterModule,
      MatIconModule
    ],
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.scss'
  }
)
export class MenuItemComponent
{
  item = input.required<menuItem>();

  collapsed = input(false);

  nestedMenuOpen = signal(false);

  toggleNested()
  {
    if(!this.item().subItems)
    {
      return;
    }
    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}

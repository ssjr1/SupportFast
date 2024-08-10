import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CiudadComponent } from './components/administracion/ciudad/ciudad.component';
import { TecnicoComponent } from "./components/administracion/tecnico/tecnico.component";

@Component
(
  {
    selector: 'app-root',
    standalone: true,
    imports: [
    RouterOutlet, CiudadComponent,
    TecnicoComponent
],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  }
)
export class AppComponent
{
}
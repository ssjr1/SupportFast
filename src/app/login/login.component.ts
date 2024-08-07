import { Component } from '@angular/core';

/* Importación de componentes de angular material */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component
(
  {
    selector: 'app-login',
    standalone: true,
    imports:
    [
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
  }
)
export class LoginComponent
{
  constructor(private router: Router) { }

  onLogin(): void {
    // Aquí puedes agregar la lógica de autenticación
    console.log('Login button clicked');
    this.router.navigate(['/principal']);
  }

  onExit(): void {
    // Redirigir a la página de inicio u otra acción
    console.log('Exit button clicked');
    this.router.navigate(['/']);  // Redirige a la página de inicio (ajusta la ruta según tus necesidades)
  }
}
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { UsuariosService } from './services/usuarios.service';
import { AreasService } from './services/areas.service';

export const appConfig: ApplicationConfig =
{
  providers:
  [
    UsuariosService,
    AreasService,
    provideZoneChangeDetection
    (
      {
        eventCoalescing: true
      }
    ),
    provideRouter
    (
      routes
    ),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    )
  ]
};

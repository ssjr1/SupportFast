import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { Component } from '@angular/core';
import { UsuarioComponent } from './components/administracion/usuario/usuario.component';
import path from 'path';
import { RolComponent } from './components/administracion/rol/rol.component';
import { NuevoTicketComponent } from './components/ticket/nuevo-ticket/nuevo-ticket.component';

export const routes: Routes =
[
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'principal',
        component: PrincipalComponent,
        children:
        [
            {
                path: 'administracion',
                component: AdministracionComponent,
                children:
                [
                    {
                        path: 'usuario',
                        component: UsuarioComponent
                    },
                    {
                        path: 'rol',
                        component: RolComponent
                    }
                ]
            },
            {
                path: 'ticket',
                component: TicketComponent,
                children:
                [
                    {
                        path: 'nuevo-ticket',
                        component: NuevoTicketComponent
                    }
                ]
            },
            {
                path: 'reporte',
                component: ReporteComponent
            }
        ]
    }
];

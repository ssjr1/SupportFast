import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

export const routes: Routes =
[
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'principal',
        component: PrincipalComponent
    },
    {
        path: 'administracion',
        component: AdministracionComponent
    },
    {
        path: 'ticket',
        component: TicketComponent
    },
    {
        path: 'reporte',
        component: ReporteComponent
    }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { UsuarioComponent } from './components/administracion/usuario/usuario.component';
import { RolComponent } from './components/administracion/rol/rol.component';
import { NuevoTicketComponent } from './components/ticket/nuevo-ticket/nuevo-ticket.component';
import { CiudadComponent } from './components/administracion/ciudad/ciudad.component';
import { AreaComponent } from './components/administracion/area/area.component';
import { EstadoComponent } from './components/administracion/estado/estado.component';
import { SolucionComponent } from './components/administracion/solucion/solucion.component';
import { TecnicoComponent } from './components/administracion/tecnico/tecnico.component';
import { CategoriaComponent } from './components/administracion/categoria/categoria.component';

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
                        path: 'perfil',
                        component: RolComponent
                    },
                    {
                        path: 'ciudad',
                        component: CiudadComponent
                    },
                    {
                        path: 'area',
                        component:AreaComponent
                    },
                    {
                        path: 'estado',
                        component: EstadoComponent
                    },
                    {
                        path: 'solucion',
                        component: SolucionComponent
                    },
                    {
                        path: 'tecnico',
                        component: TecnicoComponent
                    },
                    {
                        path: 'categoria',
                        component: CategoriaComponent
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

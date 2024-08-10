import { Routes } from '@angular/router';

import { Component } from '@angular/core';
import { UsuarioComponent } from './components/administracion/usuario/usuario.component';
import path from 'path';
import { RolComponent } from './components/administracion/rol/rol.component';
import { NuevoTicketComponent } from './components/ticket/nuevo-ticket/nuevo-ticket.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { CategoriaComponent } from './components/parametros/categoria/categoria.component';
import { EstadoComponent } from './components/parametros/estado/estado.component';
import { ListcComponent } from './components/parametros/listc/listc.component';
import { Categoria } from './modelos/Categoria';
import { ListaEstadoComponent } from './components/parametros/lista-estado/lista-estado.component';


export const routes: Routes =
  [
    { path: 'registrar', component: CategoriaComponent },
    { path: 'tablaCategoria', component: ListcComponent },
    { path: 'tablaEstado', component: ListaEstadoComponent },
    { path: 'registro', component: EstadoComponent },
    { path: 'editarCategoria/:id', component: CategoriaComponent },
    { path: 'editarEstado/:id', component: EstadoComponent },

  ];

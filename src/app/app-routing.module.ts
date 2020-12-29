import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { RastreoformsComponent } from './components/rastreoforms/rastreoforms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componetes
import { RolesTableComponent } from './components/roles-table/roles-table.component';
import { RoleseditComponent } from './components/rolesedit/rolesedit.component';
import { RolesComponent } from './components/roles/roles.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { ViajesEditComponent } from './components/viajes-edit/viajes-edit.component';
import { UsuariosEditComponent } from './components/usuarios-edit/usuarios-edit.component';
import { ResponsePasswordComponent } from './components/response-password/response-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ViajesTableComponent } from './components/viajes-table/viajes-table.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ViajesComponent } from './components/viajes/viajes.component';
import { FichaComponent } from './components/ficha/ficha.component';
import { ImagenComponent } from './components/imagen/imagen.component';

const appRoutes: Routes =
[
  {
    path: 'home',
    component: HomeComponent
   },
  {
   path: 'login',
   component: LoginComponent,
   canActivate: [BeforeLoginService]
  },
  {
    path: 'logout/:sure',
    component: LoginComponent
   },
  {
    path: 'usuarios',
    component: RegistroComponent,
   },
   {
    path: 'usuarios-table',
    component: UsersTableComponent,
   },
   {
    path: 'usuarios-edit/:id',
    component: UsuariosEditComponent,

   },
   {
    path: 'ficha/:id',
    component: FichaComponent,

   },
   {
    path: 'viajes',
    component: ViajesComponent,

   },
   {
    path: 'viajes-table',
    component: ViajesTableComponent,

   },
   {
    path: 'viajes-edit/:id',
    component: ViajesEditComponent,

   },
   {
    path: 'roles',
    component: RolesComponent,

   },
   {
    path: 'roles-edit/:id',
    component: RoleseditComponent,

   },
   {
    path: 'roles-table',
    component: RolesTableComponent,

   },
   {
    path: 'rastreoform/:id',
    component: RastreoformsComponent,

   },
   {
    path: 'enviar-email',
    component: ResetPasswordComponent,
   },
   {
    path: 'cambiar-contraseña',
    component: ResponsePasswordComponent,

   },
   {
    path: 'imagen',
    component: ImagenComponent,

   },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

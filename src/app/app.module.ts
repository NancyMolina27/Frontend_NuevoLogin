import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ViajesComponent } from './components/viajes/viajes.component';
import { RolesComponent } from './components/roles/roles.component';
import { RoleseditComponent } from './components/rolesedit/rolesedit.component';
import { RolesTableComponent } from './components/roles-table/roles-table.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ViajesTableComponent } from './components/viajes-table/viajes-table.component';
import { ViajesEditComponent } from './components/viajes-edit/viajes-edit.component';
import { UsuariosEditComponent } from './components/usuarios-edit/usuarios-edit.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResponsePasswordComponent } from './components/response-password/response-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    HomeComponent,
    ViajesComponent,
    RolesComponent,
    RoleseditComponent,
    RolesTableComponent,
    UsersTableComponent,
    ViajesTableComponent,
    ViajesEditComponent,
    UsuariosEditComponent,
    ResetPasswordComponent,
    ResponsePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

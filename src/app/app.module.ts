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
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { FilterRolesPipe } from './pipes/filter-roles.pipe';
import { FilterRastreoPipe } from './pipes/filter-rastreo.pipe';
import { RastreoformsComponent } from './components/rastreoforms/rastreoforms.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagenComponent } from './components/imagen/imagen.component';

import { NgxCaptchaModule } from 'ngx-captcha';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';

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
    ResponsePasswordComponent,
    FilterUserPipe,
    FilterRolesPipe,
    FilterRastreoPipe,
    RastreoformsComponent,
    ImagenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxCaptchaModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatSliderModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }


import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public token;
  public identity;
  public status;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
     ) {
    this.user = this.user = new User(0, 'ROlE_USER', '', '', '', '', '');
   }

  ngOnInit(): void {
    this.logout();
  }

  // tslint:disable-next-line:typedef
  onSubmit(form)
  {
    this.userService.signup(this.user).subscribe(
      response => {
      // token
        if (response.status !== 'error')
        {
          this.status = 'success';
          this.token = response;
          localStorage.setItem('token', this.token);
        // usuario identificado
          this.userService.signup(this.user, true).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            response => {
              this.identity = response;
              localStorage.setItem('identity', JSON.stringify(this.identity));
              Swal.fire(
                'Inicio de Sesión',
                '¡Bienvenido!',
                'success'
              );
        // Redireccion
              this.router.navigate(['home']);
          },
            error => {
              Swal.fire(
                'Inicio de Sesión Incorrecto!',
                '¡Verifica tus datos!',
                'error'
              );
              console.log(error as any);
          }
                    );
                } else {
                  Swal.fire(
                    'Inicio de Sesión Incorrecto!',
                    '¡Verifica tus datos!',
                    'error'
                  );
                  this.status = 'error';
                }
            },
            error => {
              Swal.fire(
                'Inicio de Sesión Incorrecto!',
                '¡Verifica tus datos!',
                'error'
              );
              console.log(error as any);
            }
          );
  }

  // tslint:disable-next-line:typedef
  logout(){
    this.route.params.subscribe(
      params => {
        // tslint:disable-next-line:no-string-literal
        const logout = +params['sure'];

        if (logout === 1)
        {
          Swal.fire('Sesión finalizada');

          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity = null;
          this.token = null;

          // redireccion
          this.router.navigate(['home']);
        }
      }
    );
  }



}

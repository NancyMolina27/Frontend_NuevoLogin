import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users';
import Swal from 'sweetalert2';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecaptchaErrorParameters } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
    `
      .error {
        color: crimson;
      }
      .success {
        color: green;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {

  public user: User;
  public token;
  public identity;
  public status;
  hide = true;
  public formModel: FormModel = {};
  // Captcha
  siteKey: string;
  size: string;
  public aFormGroup: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
     ) {
    this.user = this.user = new User(0, 'ROlE_USER', '', '', '', '', '', '');
    /* this.siteKey = '6Le_pikaAAAAAIwCQsOaGagi5XpfyeWTdpFzCqqL';
    this.size = 'normal'; */
   }
  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
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
                'Inicio de Sesión Correcto',
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
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity = null;
          this.token = null;

          Swal.fire(
            'Cerrar Sesión',
            'Sesión finalizada',
            'warning');
          // redireccion
          this.router.navigate(['login']);
        }
      }
    ); // subscribe
  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }


}

export interface FormModel {
  captcha?: string;
}

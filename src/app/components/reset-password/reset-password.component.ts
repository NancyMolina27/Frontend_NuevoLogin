import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
public form = {
  email: null
};
  constructor(
    private userservices: UserService,
  ) { }

  ngOnInit(): void {
  }


  onSubmit(): void
  {
    this.userservices.sendEmail(this.form).subscribe(
      response => this.handleResponse(response),
      error => console.log(error)
    );
  }

  handleResponse(res): void
    {
      console.log(res);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Correo enviado',
        showConfirmButton: false,
        timer: 1500
      });
      /* this.notify.success(res.data, {timeout: 0}); */
      this.form.email = null;
    }
}

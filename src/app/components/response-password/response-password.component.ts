import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-response-password',
  templateUrl: './response-password.component.html',
  styleUrls: ['./response-password.component.css']
})
export class ResponsePasswordComponent implements OnInit {
public form = {
  email: null,
  password: null,
  password_confirmation: null,
  resetToken : null
};

public error: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservices: UserService
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params.token;
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void
  {
    this.userservices.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );

  }

  handleResponse(data): void
    {
      this.router.navigateByUrl('/login');
    }
    // tslint:disable-next-line:typedef
    handleError(error)
    {
      this.error = error.error.errors;
    }

}

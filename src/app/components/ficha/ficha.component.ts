import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { RolesService } from './../../services/roles.service';
import { Roles } from './../../models/roles';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  public user: User;
  public token;
  public identity;
  public misroles: Array<Roles>;
  // tslint:disable-next-line:variable-name
  public status_user;
  public error: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservices: UserService,
    private rolesservices: RolesService

  ) {
    this.token = this.userservices.getToken();
    this.identity = this.userservices.getIdentity();
    this.getRoles();
  }

  ngOnInit(): void {
    if (this.identity == null){
      this.router.navigate(['login']);
    }
    this.route.params.subscribe(params => {
      const id = +params.id;
      this.getUser(id);
  });
  }

  // tslint:disable-next-line:typedef
  getUser(id)
  {
      this.userservices.getUser(id).subscribe(
        response => {
          if (response.status === 'success'){
            this.user = response.users;
          }
          else
          {
            this.router.navigate(['home']);
          }
        },
        error => { console.log(error); }
      );
  }
  onSubmit(form): void
  {
    // Servicio
    this.userservices.update(this.token, this.user, this.user.id).subscribe(
      response =>
      {
        if (response.status === 'success'){
          this.status_user = 'success';
          this.user = response.users;
          this.router.navigate(['usuarios-table']);

        }
        else
        {
          this.status_user = 'error';
          this.router.navigate(['home']);
        }
      },
      error =>
      {
        this.handleError(error);
        this.status_user = 'error';
      }
    );
  }

  getRoles(): void {
    this.rolesservices.getRoles().subscribe(
      response => {
          this.misroles = response.roles;
      },
      error => {
        this.handleError(error);
      }
    );
  }
  handleError(error): void {
    this.error = error.error.errors;
  }


exportAsPDF(divId): void
    {
        const data = document.getElementById('divId');
        html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('l', 'cm', 'a4'); // Generates PDF in landscape mode
        // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
        pdf.save('Filename.pdf');
      });
    }

}

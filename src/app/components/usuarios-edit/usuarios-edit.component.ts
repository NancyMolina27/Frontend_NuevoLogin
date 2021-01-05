import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { RolesService } from './../../services/roles.service';
import { Roles } from './../../models/roles';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css'],
  providers: [UserService, RolesService]
})
export class UsuariosEditComponent implements OnInit {
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
    private rolesservices: RolesService,

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
          /* this.router.navigate(['home']); */
          this.router.navigate(['usuarios-table']);
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


  // GENERAR PDF


  // tslint:disable-next-line:typedef
  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  // tslint:disable-next-line:typedef
  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.user));
    return {
      content: [
        {
          text: 'PERFIL OPERADOR',
          bold: true,
          fontSize: 25,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.user.name,
              style: 'header'
            },
            {
              text: this.user.surname,
              style: 'header'
            },
            {
              text: 'Email : ' + this.user.email,
              style: 'name'
            },
            {
              text: 'Telefono: ' + this.user.telefono,
              style: 'name'
            },
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },

        {
          columns : [
              { qr: 'Nombre: ' + this.user.name + this.user.surname +
              ',Telefono : ' + this.user.telefono, fit : 100 },
              {
              text: `(${this.user.name}, ${this.user.surname} )`,
              alignment: 'right',
              margin: [0, 20, 0, 10],
              }
          ]
        }
      ],
      info: {
        title: this.user.name + 'PERFIL OPERADOR',
        author: this.user.name && this.user.surname,
        subject: 'PERFIL OPERADOR',
        keywords: 'PERFIL OPERADOR, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 10, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 18,
            bold: false,
            italics: true,
            margin: [10, 10, 10, 10],
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }

  // tslint:disable-next-line:typedef
  getProfilePicObject() {
    if (this.user.profilePic) {
      return {
        image: this.user.profilePic ,
        width: 200,
        height: 200,
        alignment : 'right'
      };
    }
    return null;
  }

  // tslint:disable-next-line:typedef
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  // tslint:disable-next-line:typedef
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.user.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }





}

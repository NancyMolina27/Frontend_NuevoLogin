export class User {
  constructor(
    public id: number,
    // tslint:disable-next-line:variable-name
    public roles_id: string,
    public name: string,
    public surname: string,
    public email: string,
    public telefono: string,
    public password: string,

  ){}

}

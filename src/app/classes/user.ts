export class User {
  user: any;
  id: string;
  email: string;

  constructor({user, email, id}) {
    this.user = user;
    this.email = email;
    this.id = id;
  }
}

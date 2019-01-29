export class User {
  firstName: string;
  lastName: string;
  photoUrl: string;
  id: string;
  email: string;

  constructor({firstName, lastName, photoUrl, email, id}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.photoUrl = photoUrl;
    this.email = email;
    this.id = id;
  }
}

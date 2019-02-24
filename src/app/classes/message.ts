import { User } from './user';

export class Message {
  message: string;
  createdAt: Date;
  sender: User;
  attachmentUrl: string;
  name: string;

  constructor({message, createdAt, sender, attachmentUrl, name}) {
    this.message = message;
    this.createdAt = createdAt;
    this.sender = new User(sender);
    this.attachmentUrl = attachmentUrl;
    this.name = name;
  }
}

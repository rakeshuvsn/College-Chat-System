import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {

  public dummyData = [
    {
      message: 'sed enim velit',
      createdAt: new Date(),
      sender: {
        firstName: 'smith',
        lastName: 'steve',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: 'djnkdjnckd kjndcjknsd kjndjn jndncnkdn njdn enim ',
      createdAt: new Date(),
      sender: {
        firstName: 'bob',
        lastName: 'anderson',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: 'sed enim velit ckdx',
      createdAt: new Date(),
      sender: {
        firstName: 'akil',
        lastName: 'aven',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: 'sed enim efwdjkkjn kdjnckjadn kjnfdkl',
      createdAt: new Date(),
      sender: {
        firstName: 'mollice',
        lastName: 'bebo',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: 'sed velit',
      createdAt: new Date(),
      sender: {
        firstName: 'zara',
        lastName: 'miller',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: 'sed velit',
      createdAt: new Date(),
      sender: {
        firstName: 'zara',
        lastName: 'miller',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: 'sed velit',
      createdAt: new Date(),
      sender: {
        firstName: 'zara',
        lastName: 'miller',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: 'sed velit',
      createdAt: new Date(),
      sender: {
        firstName: 'zara',
        lastName: 'miller',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: 'sed velit',
      createdAt: new Date(),
      sender: {
        firstName: 'zara',
        lastName: 'miller',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebstorageService {

  constructor() { }

  setLoginStatus(loggedIn, role) {
    localStorage.setItem('isLoggedIn', loggedIn);
    localStorage.setItem('role', role);
  }

  getLoginStatus() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      role: localStorage.getItem('role'),
    };
  }

  setUserObject(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserObject() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    };
  }
}

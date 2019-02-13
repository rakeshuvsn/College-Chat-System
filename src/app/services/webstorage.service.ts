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
}

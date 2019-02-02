import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ChatComponent} from './pages/chat/chat.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileComponent} from './pages/profile/profile.component';
import {AdminComponent} from './pages/admin/admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'chat', canActivate: [ AuthGuard ],
    children: [
      {path: '', component: ChatComponent},
      {path: ':chatroomId', component: ChatComponent}
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

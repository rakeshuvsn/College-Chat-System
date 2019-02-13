import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { environment } from './../environments/environment';

//External Modules
import {
  AlertModule,
  AlertConfig,
  TabsModule,
  TabsetConfig,
  ModalModule,
  BsModalService,
  ComponentLoaderFactory,
  PositioningService
} from 'ngx-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatInputComponent } from './pages/chat/components/chat-input/chat-input.component';
import { ChatroomListComponent } from './pages/chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './pages/chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatroomWindowComponent } from './pages/chat/components/chatroom-window/chatroom-window.component';
import { ChatMessageComponent } from './pages/chat/components/chat-message/chat-message.component';

//services
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { AuthService } from './services/auth.service';
import { ChatroomService } from './services/chatroom.service';

//guards
import {AuthGuard} from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import {AdminGuard} from './guards/admin.guard';
import {WebstorageService} from './services/webstorage.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    NavbarComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatroomWindowComponent,
    ChatMessageComponent,
    ProfileComponent,
    AdminComponent,
    FooterComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    ModalModule,
    TabsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [
    AlertService,
    ChatroomService,
    BsModalService,
    PositioningService,
    ComponentLoaderFactory,
    AlertConfig, TabsetConfig,
    LoadingService,
    WebstorageService,
    AuthService,
    AuthGuard, { provide: FirestoreSettingsToken, useValue: {} },
    AdminGuard
  ],
  entryComponents: [
    AdminLoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

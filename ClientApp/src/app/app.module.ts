import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { UserComponent } from './Components/user/user.component';
import { FullpostComponent } from './Components/fullpost/fullpost.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { DataService } from './Services/data.service';
import { PostService } from './Services/post.service';
import { UserService } from './Services/user.service';
import { AccountComponent } from './Components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FullpostComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'post',
        component: FullpostComponent
      },
      {
        path: 'account',
        component: AccountComponent
      }
    ])
  ],
  providers: [DataService, PostService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

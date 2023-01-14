import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { MovieIndexComponent } from './views/movie-index/movie-index.component';
import { MovieListComponent } from './cmps/movie-list/movie-list.component';
import { MoviePreviewComponent } from './cmps/movie-preview/movie-preview.component';
import { MovieDetailsComponent } from './views/movie-details/movie-details.component';
import { MovieFilterComponent } from './cmps/movie-filter/movie-filter.component';
import { FormsModule } from '@angular/forms';
import { UserMsgComponent } from './cmps/user-msg/user-msg.component';
import { HomeComponent } from './views/home/home.component';
import { SignupScreenComponent } from './cmps/signup-screen/signup-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    MovieIndexComponent,
    MovieListComponent,
    MoviePreviewComponent,
    MovieDetailsComponent,
    MovieFilterComponent,
    UserMsgComponent,
    HomeComponent,
    SignupScreenComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';


import { MovieDetailsComponent } from './views/movie-details/movie-details.component';
import { MovieIndexComponent } from './views/movie-index/movie-index.component';
import { HomeComponent } from './views/home/home.component';
import { SignupScreenComponent } from './cmps/signup-screen/signup-screen.component';
// import { MovieIndexComponent } from './views/movie-index';

const routes: Routes = [
    { path: 'movie/:id', component: MovieDetailsComponent,},
    { path: '', component: HomeComponent,},
    { path: 'login', component: SignupScreenComponent,},
    { path: 'movie', component: MovieIndexComponent,},
    
    // {
    //     path: '', component: PetIndexComponent, children: [
    //         { path: 'edit/:id', component: PetEditComponent, resolve: {pet: PetResolver} },
    //         { path: 'edit', component: PetEditComponent }
    //     ]
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

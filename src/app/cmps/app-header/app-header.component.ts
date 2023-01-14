import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/movie.model';
import { Observable, lastValueFrom, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit, OnChanges {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  logInUser!: User;
  subscription!: Subscription;

  ngOnInit(): void {
    this.getLoggedinUser();
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.subscription = this.route.params.subscribe(async (params) => {
    //   const isMovie = params['movie'];

    // });
    console.log('SimpleChanges', changes);
  }


  getLoggedinUser() {
    let user: any = this.userService.getLoggedinUser();
    this.logInUser = user;
  }
}

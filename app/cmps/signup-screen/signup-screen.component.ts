import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.scss'],
})
export class SignupScreenComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
    ) {}

  @ViewChild('nameInput') elInput!: ElementRef<HTMLInputElement>;

  isSignUp = false;
  user!: User;

  ngOnInit(): void {
    this.user = {
      name: '',
      email: '',
      password: '',
    };
  }

  setSignUp() {
    this.isSignUp = !this.isSignUp;
    console.log('this.isSignUp', this.isSignUp);
  }

  onSaveUser() {
    this.userService.signup(this.user)
    this.router.navigateByUrl('movie');
  }
}

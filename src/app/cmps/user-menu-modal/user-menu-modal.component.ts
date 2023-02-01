import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-menu-modal',
  templateUrl: './user-menu-modal.component.html',
  styleUrls: ['./user-menu-modal.component.scss'],
})
export class UserMenuModalComponent {
  constructor(
    private userService: UserService,
    private router: Router
    ) {}

  setSingOut() {
    this.userService.logout();
    this.router.navigateByUrl('');
  }
}

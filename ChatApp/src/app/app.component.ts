import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-app';
  user: User;

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-pad',
  templateUrl: './note-pad.component.html',
  styleUrls: ['./note-pad.component.scss'],
})
export class NotePadComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserLoginStatus().subscribe((isLoggedIn: any) => {
      if (isLoggedIn) {
        this.user = isLoggedIn;
      } else {
        this.user = null;
      }
    });
  }
}

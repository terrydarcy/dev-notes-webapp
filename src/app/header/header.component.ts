import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountModalComponent } from '../modals/create-account-modal/create-account-modal.component';
import { LogInModalComponent } from '../modals/log-in-modal/log-in-modal.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggleControl = new FormControl(false);
  user: any = false;
  parentRef = this.overlay.getContainerElement().parentElement;

  @HostBinding('class') className = '';
  darkModeLocal: boolean =
    localStorage.getItem('darkMode') === 'true' ? true : false;

  constructor(public overlay: OverlayContainer, public dialog: MatDialog, private authService: AuthService) {
    this.authService.getUserLoginStatus().subscribe((isLoggedIn: any) => {
      if (isLoggedIn) {
        this.user = isLoggedIn;
      } else {
        this.user = null;
      }
      console.log(this.user);
    });
    this.setDarkModeFromLocalStorage();
  }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode && this.parentRef) {
        this.parentRef.classList.add(darkClassName);
        localStorage.setItem('darkMode', 'true');
      } else if (this.parentRef) {
        this.parentRef.classList.remove(darkClassName);
        localStorage.setItem('darkMode', 'false');
      }
    });
  }

  setDarkModeFromLocalStorage = () => {
    if (this.darkModeLocal && this.parentRef) {
      this.toggleControl.enable();
      this.parentRef.classList.add('darkMode');
    } else if (this.parentRef) {
      this.parentRef.classList.remove('darkMode');
    }
  };

  openCreateAccountDialog() {
    const dialogRef = this.dialog.open(CreateAccountModalComponent, {
      height: '550px',
      width: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.openLogInDialog();
      }
    });
  }

  openLogInDialog() {
    const dialogRef = this.dialog.open(LogInModalComponent, {
      height: '500px',
      width: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.openCreateAccountDialog();
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}

import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountModalComponent } from '../modals/create-account-modal/create-account-modal.component';
import { LogInModalComponent } from '../modals/log-in-modal/log-in-modal.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggleControl = new FormControl(false);

  @HostBinding('class') className = '';
  isDark: boolean = false;

  constructor(public overlay: OverlayContainer, public dialog: MatDialog) {}
  openCreateAccountDialog() {
    const dialogRef = this.dialog.open(CreateAccountModalComponent, {
      height: '500px',
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

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      let parentRef = this.overlay.getContainerElement().parentElement;
      if (darkMode && parentRef) {
        this.isDark = true;
        parentRef.classList.add(darkClassName);
      } else if (parentRef) {
        this.isDark = false;
        parentRef.classList.remove(darkClassName);
      }
    });
  }
}

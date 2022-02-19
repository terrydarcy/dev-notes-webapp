import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material/dialog';
import {CreateAccountModalComponent} from '../create-account-modal/create-account-modal.component';
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
  openDialog() {
    const dialogRef = this.dialog.open(CreateAccountModalComponent , {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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

import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import { MatDialogRef } from '@angular/material/dialog';
import {AuthService} from '../../auth/auth.service';
@Component({
  selector: 'app-log-in-modal',
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.scss', '../styles.scss'],
})
export class LogInModalComponent extends BaseComponent implements OnInit {
  
  email: string = '';
  password: string = '';

  constructor(private dialogRef: MatDialogRef<LogInModalComponent>, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {}

  override transferAuth(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(true);
  }

  login(event: Event): void {
    event.preventDefault();
    this.authService.login(this.dialogRef,this.email, this.password);
  }
  loginWithGitHub(event: Event): void {
    event.preventDefault();
    this.authService.loginWithGitHub(this.dialogRef);    
   }
}

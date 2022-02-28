import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import { MatDialogRef } from '@angular/material/dialog';
import {AuthService} from '../../services/auth/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {pairwise, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-log-in-modal',
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.scss', '../styles.scss'],
})
export class LogInModalComponent extends BaseComponent implements OnInit {
  
  emailFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
  email :string = '';
  password: string = '';

  constructor(private dialogRef: MatDialogRef<LogInModalComponent>, private authService: AuthService) {
    super();
  }
  
  ngOnInit(): void {
    this.emailFormControl
    .valueChanges
    .pipe(startWith(null), pairwise())
    .subscribe(([prev, next]: [any, any]) => { 
      this.email = next;
    });
  
  // Fill buffer with initial value.  Will emit immediately.
  this.passwordFormControl
    .valueChanges
    .pipe(startWith(null), pairwise())
    .subscribe(([prev, next]: [any, any]) => {
      this.password = next;
    });
  }

  clearForm() {
    this.emailFormControl.reset();
    this.passwordFormControl.reset();
  }

  override transferAuth(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(true);
    this.clearForm();
  }

  login(event: Event): void {
    event.preventDefault();
    this.authService.login(this.dialogRef,this.email, this.password);
    this.clearForm();
  }
  loginWithGitHub(event: Event): void {
    event.preventDefault();
    this.authService.loginWithGitHub(this.dialogRef);    
    this.clearForm();
  }
}

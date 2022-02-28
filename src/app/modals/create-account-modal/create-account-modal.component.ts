import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import {MatDialogRef} from '@angular/material/dialog';
import {_createUserWithEmailAndPassword } from "../../../firebase";
import {AuthService} from '../../services/auth/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {pairwise, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss','../styles.scss']
})
export class CreateAccountModalComponent extends BaseComponent implements OnInit {

  username: string = "";
  email: string = "";
  password: string= "";
  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);

  constructor(private dialogRef: MatDialogRef<CreateAccountModalComponent>, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.usernameFormControl
    .valueChanges
    .pipe(startWith(null), pairwise())
    .subscribe(([prev, next]: [any, any]) => { 
      this.username = next;
    });

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

   createAccountEmailPassword(event: Event): void {
    event.preventDefault();
    this.authService.createAccount(this.dialogRef,this.username, this.email, this.password);  
    this.clearForm();  
   }

   createAccountGitHub(event: Event): void {
    event.preventDefault();
    this.authService.loginWithGitHub(this.dialogRef);    
    this.clearForm(); 
  }
}

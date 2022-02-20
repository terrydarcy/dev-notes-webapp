import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import {MatDialogRef} from '@angular/material/dialog';
import {_createUserWithEmailAndPassword } from "../../../firebase";
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss','../styles.scss']
})
export class CreateAccountModalComponent extends BaseComponent implements OnInit {

  username: string = "";
  email: string = "";
  password: string= "";

  constructor(private dialogRef: MatDialogRef<CreateAccountModalComponent>, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
  }

  override transferAuth(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(true);
   }

   createAccountEmailPassword(event: Event): void {
    event.preventDefault();
    this.authService.createAccount(this.dialogRef,this.username, this.email, this.password);    
   }

   createAccountGitHub(event: Event): void {
    event.preventDefault();
    this.authService.loginWithGitHub(this.dialogRef);    
   }
}

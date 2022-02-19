import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss','../styles.scss']
})
export class CreateAccountModalComponent extends BaseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CreateAccountModalComponent>) {
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
    
    //this.dialogRef.close(true);
   }
   createAccountGitHub(event: Event): void {
    event.preventDefault();
    
    //this.dialogRef.close(true);
   }
}

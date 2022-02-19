import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-log-in-modal',
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.scss','../styles.scss']
})
export class LogInModalComponent extends BaseComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<LogInModalComponent>) {
    super();
  }

  override transferAuth(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(true);
   }

   login(event: Event): void {
     event.preventDefault();
     //this.dialogRef.close(true);
    }

  ngOnInit(): void {
   }

}

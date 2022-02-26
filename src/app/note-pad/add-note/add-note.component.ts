import { Component, OnInit, Input } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { NoteService } from '../../services/note/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})

export class AddNoteComponent implements OnInit {
  descriptionFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  titleFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  isDisabled: boolean = true;
  mouseOvered: boolean =false;
  title: string = "";
  description: string= "";

  @Input() user: any;

  constructor(private noteService: NoteService) { }

  addNote(e: Event) { 
    e.preventDefault();
    this.noteService.setNote(this.user.uid, this.title, this.description);
    this.close(e);
   }

  close(e: Event) {
    e.preventDefault();
    this.isDisabled = true;
    this.mouseOvered = false;
  }

  ngOnInit(): void {
  }

}

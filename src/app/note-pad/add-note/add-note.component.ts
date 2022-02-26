import { Component, OnInit, Input , NgZone, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { NoteService } from '../../services/note/note.service';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {pairwise, startWith} from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/Interfaces';
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
  faCheckSquare = faCheckSquare as IconProp;
  @Output() noteEmmiter = new EventEmitter<Note>();

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @Input() user: any;

  constructor(private noteService: NoteService, private _ngZone: NgZone) { }
 
  ngOnInit(): void {
    this.titleFormControl
    .valueChanges
    .pipe(pairwise())
    .subscribe(([prev, next]: [any, any]) => {
      this.title = next;
    });

  // Fill buffer with initial value.  Will emit immediately.
  this.descriptionFormControl
    .valueChanges
    .pipe(startWith(null), pairwise())
    .subscribe(([prev, next]: [any, any]) => {
      this.description = next;
    });
  }

  emitNote(note: Note) {
    this.noteEmmiter.emit(note);
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  addNote(e: Event) { 
    e.preventDefault();  
    const noteObservable = this.noteService.setNote(this.user.uid, this.capitalizeFirstLetter(this.title), this.capitalizeFirstLetter(this.description));
    noteObservable.subscribe((result) => {
      if(result.data) {
         this.emitNote(result.data);
      }
    });
     this.close(e);
  }
  
  capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  close(e: Event) {
    e.preventDefault();
    this.isDisabled = true;
    this.mouseOvered = false;
  }
}

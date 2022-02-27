import { Component, OnInit, Input } from '@angular/core';
import {Note} from "../../models/Interfaces";
import { Output, EventEmitter } from '@angular/core';
import { NoteService } from '../../services/note/note.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note!: any;
  @Output() deleteEmitter = new EventEmitter<Note>();

  constructor(private noteService: NoteService, private toastr: ToastrService ) { }

  ngOnInit(): void {}

  delete(note: Note) {
     this.noteService.deleteNote(note.id).subscribe((result) => {
      if(result.data) {
        this.emitNote(result.data);
        this.toastr.success('Note deleted successfully!');
      }else {
        this.toastr.error('Please try again','Note could not be deleted!');
      }
    });
  }

  emitNote(note: Note) {
    this.deleteEmitter.emit(note);
  }

  getMinute(timestamp : Date) :string {
    const date = new Date(timestamp);
    let mintues = String(date.getMinutes()).padStart(2, '0');
    return mintues;
  }
  getHour(timestamp : Date) :string{
    const date = new Date(timestamp);
    let hours = String(date.getHours()).padStart(2, '0');
    return hours;
  }
  getDay(timestamp : Date) :string{
    const date = new Date(timestamp);
    let day = String(date.getDate()).padStart(2, '0');
    return day;
  }
  getMonth(timestamp : Date) :string{
    const date = new Date(timestamp);
    let month = String(date.getMonth()).padStart(2, '0');
    return month;
  }
  getYear(timestamp : Date) :number{
    const date = new Date(timestamp);
    return date.getFullYear();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { NoteService } from '../services/note/note.service';
import { Note } from '../models/Interfaces';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-note-pad',
  templateUrl: './note-pad.component.html',
  styleUrls: ['./note-pad.component.scss'],
})
export class NotePadComponent implements OnInit {
  user: any;

  notes: Note[] = [];
  notesDataObservable!: Observable<any>;

  constructor(
    private authService: AuthService,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserLoginStatus().subscribe((isLoggedIn: any) => {
      if (isLoggedIn) {
        this.user = isLoggedIn;
        if (this.user.uid) {
          this.notesDataObservable = this.noteService.getNotes(
            this.user.uid.toString()
          );
        }
        this.notesDataObservable.subscribe((result) => {
          if (result.data) {
            this.notes = result.data;
          }
        });
      } else {
        this.notesDataObservable = of([]);
        this.notes = [];
        this.user = null;
      }
    });
  }

  addNoteFromEmitter(newNote: any) {
    this.notes.unshift(newNote);
  }

  deleteNoteFromEmitter(deleteNotes: any) {
    let noteToDelete = deleteNotes[0];
    if (noteToDelete)
      this.notes = this.notes.filter(
        (note) => JSON.stringify(note) !== JSON.stringify(noteToDelete)
      );
  }
}

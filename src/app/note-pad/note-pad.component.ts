import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { NoteService } from '../services/note/note.service';
import {Note} from "../models/Interfaces";
import {Observable} from "rxjs";
@Component({
  selector: 'app-note-pad',
  templateUrl: './note-pad.component.html',
  styleUrls: ['./note-pad.component.scss'],
})
export class NotePadComponent implements OnInit {
  user: any;

  notes: Note[]= [];
  notesDataObservable!: Observable<any>;

  constructor(private authService: AuthService,private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserLoginStatus().subscribe((isLoggedIn: any) => {
      if (isLoggedIn) {
        this.user = isLoggedIn;
        this.notesDataObservable = this.noteService.getNotes(this.user.uid.toString());
        this.notesDataObservable.subscribe((result) => {
          if(result.data) {
            this.notes = result.data;
          }
        });

      } else {
        this.user = null;
      }
    });    
  }

  addNoteFromEmitter(newNote: any) {
    this.notes.unshift(newNote);
 }
}

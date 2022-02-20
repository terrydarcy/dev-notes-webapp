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
      } else {
        this.user = null;
      }
    });

    //add note to db 
    //this.noteService.setNote("12345");
    
    //get notes from db for user_id 
    this.notesDataObservable = this.noteService.getNotes("12345");

    this.notesDataObservable.subscribe((result) => {
      if(result.data) {
        console.log("result from note service:", result.data);
        this.notes = result.data;
      }
    });
  }
}

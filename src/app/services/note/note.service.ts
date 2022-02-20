import { Injectable } from '@angular/core';
import axios, {AxiosObservable} from "axios-observable"
import { BehaviorSubject, Observable } from 'rxjs';
import {Note} from "../../models/Interfaces";


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl: string = "http://localhost:5001/dev-notes-a7a54/us-central1/devNotesAPI";
  notesUrl: string  = "http://localhost:5001/dev-notes-a7a54/us-central1/devNotesAPI/notes";

  constructor() { 
    //12345
    console.log(this.getNotes("12345"));
  }

  getNotes(user_id : string) : AxiosObservable<Note> { 
    let url = `user/${user_id}`;
    
    let result = axios.request({
      method:'get',
      url: url,
      baseURL: this.notesUrl,
     })
 
     return result;
  }

  setNote(user_id: string) {
    let result = axios.request({
      method:'post',
      url: "/",
      baseURL: this.notesUrl,
      data: {
        user_id: user_id,
        note_text: "test from ANGULAR!",
        timestamp: new Date()
      }
     })

     result.subscribe((result) => {
       console.log(result);
     });
    
  }
}

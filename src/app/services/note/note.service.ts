import { Injectable } from '@angular/core';
import axios, {AxiosObservable} from "axios-observable"
import { BehaviorSubject, Observable } from 'rxjs';
import {Note} from "../../models/Interfaces";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl: string;
  notesUrl: string = "/notes";

  constructor() { 
    if (environment.production) {
      this.baseUrl = "https://us-central1-dev-notes-a7a54.cloudfunctions.net/devNotesAPI";
     } else {
       //this.baseUrl = "https://us-central1-dev-notes-a7a54.cloudfunctions.net/devNotesAPI";
       this.baseUrl = "http://localhost:5001/dev-notes-a7a54/us-central1/devNotesAPI";

     }
  }

  getNotes(user_id : string) : AxiosObservable<Note> { 
    let url = `/notes/user/${user_id}`;
    
    let result = axios.request({
      headers :{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method:'get',
      url: url,
      baseURL: this.baseUrl,
     })
     
 
     return result;
  }

  setNote(user_id: string, note_title:string, note_text:string) {
    let result = axios.request({
      headers :{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method:'post',
      url: "/notes/",
      baseURL: this.baseUrl,
      data: {
        note_title: note_title,
        user_id: user_id,
        note_text: note_text,
        timestamp: new Date()
      }
     })

     result.subscribe();
    
  }
}

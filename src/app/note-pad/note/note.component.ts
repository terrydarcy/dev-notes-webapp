import { Component, OnInit, Input } from '@angular/core';
import {Note} from "../../models/Interfaces";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note!: any;

  constructor() { }

  ngOnInit(): void {
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

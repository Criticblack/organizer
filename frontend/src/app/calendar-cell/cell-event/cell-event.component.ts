import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell-event',
  templateUrl: './cell-event.component.html',
  styleUrls: ['./cell-event.component.css']
})
export class CellEventComponent implements OnInit {

  @Input() event: any;
  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() editedEvent: EventEmitter<any> = new EventEmitter<any>();

  modeEdit: boolean = false;
  title: string = null;

  constructor() { }

  ngOnInit() {
    this.title = this.event['title']; 
  }

  editEvent() {
    this.modeEdit = true;
  }

  cancelEdit() {
    this.modeEdit = false;
  }

  updateEvent() {
    this.modeEdit = false;
    this.editedEvent.emit({id: this.event.id, title: this.title});
    this.event.title = this.title;  
  }

  deleteEvent() {
    this.removeEvent.emit(this.event.id);
  }
}

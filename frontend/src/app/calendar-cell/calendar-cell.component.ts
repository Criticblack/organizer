import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {EventsService} from '../service/events-service';
import {trigger, transition, style, animate, group, state} from '@angular/animations';

@Component({
  selector: 'app-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.css'],
  animations: [
    trigger('itemAnim', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-13%)'}),
        animate('0.05s ease-in')
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('dialog', [
      transition('void => *', [
        style({transform: 'translate(0,150px)', opacity: '0'}),
        animate('0.15s ease-in')
      ]),
      transition('* => void', [
        animate(100, style({opacity: '0'}))
      ])
    ])
  ]
})
export class CalendarCellComponent implements OnInit {
  showT: boolean;

  @Input() dateEvent: any;
  @Output() newEvents: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() updatedEvent: EventEmitter<any> = new EventEmitter<any>();

  addTaskValue: string;

  recentAdedEvents: any;

  today: boolean;

  invalid: boolean;

  activeId: any;

  constructor(private eventService: EventsService) {
  }

  ngOnInit() {
    const today = new Date();
    (this.dateEvent.date.toLocaleDateString() === today.toLocaleDateString()) ? this.today = true : this.today = false;
  }

  toggle(e: any) {
    if (e.target.id === 'background') {
      this.showT = !this.showT;
    }
  }

  show() {
    this.showT = !this.showT;
  }

  updateEvent(updatedNote: any): void {
    const noteId = updatedNote.id
    const noteTitle = updatedNote.title;
    this.dateEvent.events.forEach(element => {
      if (element.id === noteId) {
        element.title = noteTitle;
      }
    });
    this.updatedEvent.emit(this.dateEvent.events);
    this.eventService.updateNote(noteId, noteTitle).subscribe();


  }

  addNewEvent($event) {
    const data = $event.target.value;
    if (data.length === 0) {
      this.invalid = true;
      return;
    }
    this.invalid = false;
    const eventTitle = $event.target.value;

    this.eventService.pushNotes({
      'time': this.dateEvent.date,
      'title': eventTitle,
      'content': 'a'
    })
    .toPromise()
    .then((res: any) => {
      this.dateEvent.events.push({
        'title': res.note.title,
        'id': res.note._id
      });
      this.dateEvent.noEvents++;
      this.newEvents.emit({
        'time': this.dateEvent.date,
        'title': eventTitle,
        'content': 'foo bar',
        'id': res.note._id
      });
    });
    this.addTaskValue = null;
  }

  deleteEvent(id) {
    this.dateEvent.events = this.dateEvent.events.filter((object) => {
      return object.id !== id;
    });
    this.dateEvent.noEvents--;
    if (this.dateEvent.noEvents === 0) {
      this.dateEvent.noEvents = null;
    }
    this.removeEvent.emit(id);
    this.eventService.removeNote(id).subscribe();
  }

  deleteWarning($e) {
    if ($e.keyCode !== 13) {
      this.invalid = false;
    }
  }

}

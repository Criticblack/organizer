import {Component, OnInit} from '@angular/core';
import {trigger, transition, animate, style, state, keyframes} from '@angular/animations';
import {EventsService} from '../service/events-service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger('slideInOut', [
      state('base', style({
        opacity: '1'
      })),
      transition('base => next',
        animate('400ms ease-in', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(-100%)', offset: 0.49}),
            style({transform: 'translateX(100%)', offset: 0.50}),
            style({transform: 'translateX(0)', offset: 1.0})
          ]),
        )),
      transition('base => previous',
        animate('400ms ease-in', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(100%)', offset: 0.49}),
            style({transform: 'translateX(-100%)', offset: 0.50}),
            style({transform: 'translateX(0)', offset: 1.0})
          ]),
        )),
    ]),
  ]
})
export class CalendarComponent implements OnInit {

  animationState = 'base';

  notes: any = [];

  Calendar: Calendar;
  counter = 0;
  loading: boolean;

  constructor(private eventService: EventsService) {
  }

  ngOnInit() {
    this.loading = true;
    this.eventService
      .getNotes()
      .subscribe((rez) => {
        this.notes = rez;
        const today = new Date();
        this.Calendar = this.generateCalendar(today);
        this.loading = false;
      });
  }

  getDayName(day: number): string {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satruday', 'Sunday'][day];
  }

  getMonthName(month: number): string {
    return [
      'January',
      'February',
      'March',
      'Arpil',
      'May',
      'June',
      'July',
      'August',
      'September',
      'Octomber',
      'November',
      'December'
    ][month];
  }

  compareDates(d1: any, d2: any): boolean {
    return (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) ? true : false;
  }

  previousMonth() {
    this.animationState = 'previous';
    setTimeout(() => {
      this.animationState = 'base';
    }, 500);
    const previousDate = new Date();
    this.counter--;
    previousDate.setMonth(previousDate.getMonth() + this.counter);
    this.Calendar = this.generateCalendar(previousDate);
  }

  nextMonth() {
    this.animationState = 'next';
    setTimeout(() => {
      this.animationState = 'base';
    }, 500);
    const nextDay = new Date();
    this.counter++;
    nextDay.setMonth(nextDay.getMonth() + this.counter);
    this.Calendar = this.generateCalendar(nextDay);
  }

  addMonthsToDate(input, noOfMonths) {
    input.setMonth(input.getMonth() + noOfMonths);
    return input.toString();
  }

  generateCalendar(date: any) {

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const Calendar = <Calendar>{};

    Calendar.fullDate = date;
    Calendar.year = year;
    Calendar.monthName = this.getMonthName(month);

    let gDate = new Date(year, month, 0).getDay();
    Calendar.firstWeekDay = Array(gDate).fill(gDate).map((x, i) => i);

    gDate = new Date(year, month, daysInMonth - 1).getDay();
    Calendar.lastWeekDay = Array(7 - gDate).fill(7 - gDate).map((x, i) => i);

    const dateEvents: Array<DatesEvents> = [];

    for (let i = 0; i < daysInMonth; i++) {
      const incomingData = this.notes.notes;
      const thisDate = new Date(year, month, i + 1);
      const events = [];

      for (const note of incomingData) {
        const date = new Date(note.time);
        if (this.compareDates(thisDate, date)) {
          events.push({'title': note.title, 'id': note._id});
        }
      }
      dateEvents.push({
        month: this.getMonthName(month),
        day: i + 1,
        dayName: this.getDayName(new Date(year, month, i).getDay()),
        noEvents: events.length,
        events: events,
        date: thisDate
      });
    }

    Calendar.DateEvents = dateEvents;
    return Calendar;

  }

  /** There is a set of optimiscs updates :) **/
  addEvent($event) {
    this.notes.notes.push($event);
  }

  removeEvent($event) {
    this.notes.notes = this.notes.notes.filter((object) => object._id !== $event);
  }

  updatedEvent($event) {
    const note = $event[0];
    this.notes.notes.forEach(element => {      
      if (element._id === note.id) {
        element.title = note.title;
      }
    });
  }
}

interface Calendar {
  fullDate: any;
  year: number;
  monthName: string;
  firstWeekDay: Array<number>;
  lastWeekDay: Array<number>;
  DateEvents: Array<DatesEvents>;
}

interface DatesEvents {
  month: string;
  day: number;
  dayName: string;
  noEvents: number;
  events: Array<object>;
  date: any;
}

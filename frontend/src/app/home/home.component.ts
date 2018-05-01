import { Component, OnInit } from '@angular/core';
import { EventsService } from '../service/events-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today;

  constructor(private eventsService: EventsService) { }
    
  ngOnInit() {
      this.eventsService.getToday()
      .subscribe((res) => {
        //   console.log(res);
        this.today = res;
      })
  }

}

import {Component, ViewChild} from '@angular/core';
import {RouterLinkActive} from '@angular/router';
import {NgZone} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('sidenav') sidenav: any;
  constructor(private zone: NgZone) {
    const mql: MediaQueryList = window.matchMedia('(min-width: 600px)');

    mql.addListener((mql: MediaQueryList) => {
      zone.run( () => { // Change the property within the zone, CD will run after
        this.sidenav.toggle();
      });
    });
  }


  public matchMedia() {
  }

}

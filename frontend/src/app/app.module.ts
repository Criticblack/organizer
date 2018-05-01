import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AboutComponent} from './about/about.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { EventsService } from './service/events-service';
import { CalendarComponent} from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { CellEventComponent } from './calendar-cell/cell-event/cell-event.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'calendar', component: CalendarComponent, },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AboutComponent,
    CalendarCellComponent,
    HomeComponent,
    CellEventComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule

  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

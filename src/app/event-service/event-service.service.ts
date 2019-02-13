import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class EventServiceService {

  url = 'this gonna be the place for the URL';

  constructor(private http: HttpClient) { }

  sendUserEvent(eventDetails: EventDetails): Observable<EventDetails[]> {
    console.log(eventDetails, 'sent to the server');
    return this.http.post<EventDetails[]>(this.url, eventDetails);

  }

}
export interface EventDetails {
  UserID: string;
  StateID: string;
  DateInit: string;
  DateEnd?: string;
  TimeSpent?: string;
}

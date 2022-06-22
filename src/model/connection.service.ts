import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

/**
 * This class uses the PWA functionality of Angular
 * this means you can cache certain pieces of the application for the user
 * to keep it running even tho there is no network connection
 * This is a small application of said functionality
 * ngsw-config.json contains the configuration concerning PWA functionality
 */
@Injectable()
export class ConnectionService {
  private readonly connEvents: Subject<boolean>;

  constructor() {
    this.connEvents = new Subject<boolean>();
    window.addEventListener("online",
      (e) => this.handleConnectionChange(e));
    window.addEventListener("offline",
      (e) => this.handleConnectionChange(e));
  }

  private handleConnectionChange(event) {
    this.connEvents.next(this.connected);
  }

  get connected() : boolean {
    return window.navigator.onLine;
  }

  get Changes(): Observable<boolean> {
    return this.connEvents;
  }
}

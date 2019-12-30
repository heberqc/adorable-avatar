import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  @ViewChild('nickname', { static: true }) nickname: ElementRef;
  input$;
  subscription;
  observer;

  constructor() {
    this.observer = {
      next: evt => console.log(evt.target.value),
      error: err => console.error(err),
      complete: () => console.log(),
    }
  }

  ngAfterViewInit() {
    this.input$ = fromEvent(this.nickname.nativeElement, 'keyup').pipe(debounceTime(500));
    this.subscription = this.input$.subscribe(this.observer);
  }
}

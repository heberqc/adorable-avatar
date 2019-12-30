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
  @ViewChild('avatar', { static: true }) avatar: ElementRef;

  input$;
  subscription;
  observer;

  constructor() {
    this.observer = {
      next: evt => {
        const nickname = evt.target.value;
        this.avatar.nativeElement.src = this.imageURI(nickname);
      },
      error: err => console.error(err),
      complete: () => console.log('Fin'),
    }
  }

  imageURI(nickname) {
    return `https://api.adorable.io/avatars/300/${nickname}.png`;
  }

  ngAfterViewInit() {
    this.input$ = fromEvent(this.nickname.nativeElement, 'keyup').pipe(debounceTime(500));
    this.subscription = this.input$.subscribe(this.observer);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

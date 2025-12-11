import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RoomService } from './room-service/room-service.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('project 123');

  availableNames = ['PureCss', 'Angular', 'React', 'Vue', 'Svelte'];

  onalertclicked(number: number): void {
    console.log(`Alert clicked ${number} times`);
  }
}

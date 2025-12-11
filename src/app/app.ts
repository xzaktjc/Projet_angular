import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RoomServiceComponent } from './room-service/room-service.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RoomServiceComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('project 123');

  availableNames = ['PureCss', 'Angular', 'React', 'Vue', 'Svelte'];

  constructor(private router: Router) {}

  onalertclicked(number: number): void {
    console.log(`Alert clicked ${number} times`);
  }

  /** Exemple : gérer l’activation du RoomServiceComponent */
  onRoomServiceActivated(roomService: RoomServiceComponent) {
    roomService.activated$.subscribe(() => {
      console.log('Room service clicked!');
      // Exemple de navigation
      this.router.navigateByUrl(roomService.route);
    });
  }
}

import { Component, signal, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RoomServiceComponent } from './room-service/room-service.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ChatBotButtonComponent } from './chat-bot-button/chat-bot-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, RoomServiceComponent, ChatBotButtonComponent,  RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements AfterViewInit {
  protected readonly title = signal('project 123');

  @ViewChild('roomA') roomA!: RoomServiceComponent;
  @ViewChild('roomB') roomB!: RoomServiceComponent;
  @ViewChild('roomC') roomC!: RoomServiceComponent;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Test avec console.log avant navigation
    this.roomA.activated$.subscribe(() => {
      console.log('Room A clicked!');
      this.router.navigateByUrl(this.roomA.route);
    });
    this.roomB.activated$.subscribe(() => {
      console.log('Room B clicked!');
      this.router.navigateByUrl(this.roomB.route);
    });
    this.roomC.activated$.subscribe(() => {
      console.log('Room C clicked!');
      this.router.navigateByUrl(this.roomC.route);
    });
  }
}

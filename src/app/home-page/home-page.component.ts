import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoomServiceComponent } from '../room-service/room-service.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, RoomServiceComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('roomA') roomA!: RoomServiceComponent;
  @ViewChild('roomB') roomB!: RoomServiceComponent;
  @ViewChild('roomC') roomC!: RoomServiceComponent;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Debug prints pour confirmer les clics — utile pour tester
    if (this.roomA) {
      this.roomA.activated$.subscribe(() => {
        console.log('HomePage: Room A clicked');
        this.router.navigateByUrl(this.roomA.route);
      });
    }
    if (this.roomB) {
      this.roomB.activated$.subscribe(() => {
        console.log('HomePage: Room B clicked');
        this.router.navigateByUrl(this.roomB.route);
      });
    }
    if (this.roomC) {
      this.roomC.activated$.subscribe(() => {
        console.log('HomePage: Room C clicked');
        this.router.navigateByUrl(this.roomC.route);
      });
    }
  }
}

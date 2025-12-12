import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RoomServicePageComponent } from './room-service-page/room-service-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent }, // page d'accueil contenant les boutons
  { path: 'room-service-page', component: RoomServicePageComponent },
  { path: '**', redirectTo: '' } // fallback
];

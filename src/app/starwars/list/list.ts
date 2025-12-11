import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

interface Planet {}

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  private http = inject(HttpClient);

  planets$ = this.http
    .get<Planet[]>('https://swapi.dev/api/planets/')
    .pipe
    // map((response) => response.results),
    ();
}

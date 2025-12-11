import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

interface Result<T> {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
}

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  private http = inject(HttpClient);

  planets$ = this.http
    .get<Result<Planet>>('https://swapi.dev/api/planets/')
    .pipe(map((res) => res.results));
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map, timer } from 'rxjs';

const COST_PAIN_AU_CHOCOLAT = 1.5;
const COST_CROISSANT = 1.2;

@Component({
  selector: 'app-bakery-container',
  imports: [CommonModule],
  templateUrl: './bakery-container.html',
  styleUrl: './bakery-container.scss',
})
export class BakeryContainer {
  painAuChocolatFatoryTimer = timer(0, 2000);
  croissantFatoryTimer = timer(0, 3000);

  painAuChocolatCreated$ = this.painAuChocolatFatoryTimer.pipe(
    // Logic to create pain au chocolat
    map((timer) => 3 * timer)
  );

  treasuryPainAuChocolatCreated$ = this.painAuChocolatCreated$.pipe(
    // Logic to add to treasury
    map((created) => created * COST_PAIN_AU_CHOCOLAT)
  );

  croissantCreated$ = this.croissantFatoryTimer.pipe(
    // Logic to create croissant
    map((timer) => 4 * timer)
  );

  treasuryCroissantCreated$ = this.croissantCreated$.pipe(
    // Logic to add to treasury
    map((created) => created * COST_CROISSANT)
  );
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-service',
  templateUrl: './room-service.component.html',
  styleUrls: ['./room-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomServiceComponent {
  /** Texte affiché sous l'image */
  @Input() name: string = 'Room Service';

  /** URL de l'image (optionnel) */
  @Input() imageUrl?: string;

  /** Route vers laquelle naviguer (par défaut) */
  @Input() route: string = '/room-service';

  /** Fallback local (data URL simple) */
  fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="%23f2f2f2"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="%23999">Image</text></svg>';

  constructor(private router: Router) {}

  go(): void {
    // navigation via Router pour que ce soit compatible SPA
    this.router.navigateByUrl(this.route).catch(err => {
      // silencieux en cas d'erreur (ton app peut logger)
      // console.warn('Navigation failed', err);
    });
  }

  onKeySpace(event: KeyboardEvent): void {
    // empêcher le scroll quand espace est pressée
    event.preventDefault();
    this.go();
  }

  onImageError(): void {
    this.imageUrl = undefined; // force le fallback
  }
}

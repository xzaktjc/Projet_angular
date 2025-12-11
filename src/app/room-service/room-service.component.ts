import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, fromEvent, merge, Observable } from 'rxjs';
import { filter, mapTo, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-room-service',
  templateUrl: './room-service.component.html',
  styleUrls: ['./room-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomServiceComponent implements AfterViewInit, OnDestroy {
  /** Texte affiché sous l'image */
  @Input() name: string = 'Room Service';

  /** URL de l'image (optionnel) */
  @Input() imageUrl?: string;

  /** Route vers laquelle naviguer (optionnel) */
  @Input() route: string = '/room-service';

  /** Si true, le composant déclenche la navigation via Router ; sinon il émet seulement activated$. */
  @Input() navigate: boolean = true;

  /** Fallback inline si l'image manque */
  fallbackImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="%23f2f2f2"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="%23999">Image</text></svg>';

  /** bouton DOM (référencé depuis le template) */
  @ViewChild('btn', { static: true, read: ElementRef }) button!: ElementRef<HTMLButtonElement>;

  /** Subject interne pour activation ; exposé en observable pour l'extérieur */
  private readonly _activated$ = new Subject<void>();
  public readonly activated$: Observable<void> = this._activated$.asObservable();

  /** pour cleanup */
  private readonly destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // stream clicks
    const clicks$ = fromEvent(this.button.nativeElement, 'click').pipe(mapTo(undefined));

    // stream keydown -> ne garder que Space / Enter
    const keydowns$ = fromEvent<KeyboardEvent>(this.button.nativeElement, 'keydown').pipe(
      filter((ev) =>
        ev.code === 'Space' || ev.key === ' ' || ev.code === 'Enter' || ev.key === 'Enter'
      ),
      tap((ev) => ev.preventDefault()), // empêcher scroll quand Space
      mapTo(undefined)
    );

    // fusionner les deux flux en un seul pipeline réactif
    merge(clicks$, keydowns$)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          // émission observable (pub/sub)
          this._activated$.next();
        }),
        // si navigate=true, effectue la navigation ; sinon passe outre
        filter(() => this.navigate),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        // navigation via Router : on ignore l'erreur pour ne pas casser l'app
        this.router.navigateByUrl(this.route).catch(() => {
          // optional: log si besoin
        });
      });
  }

  /** fallback si l'image echoue */
  onImageError(): void {
    this.imageUrl = undefined;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this._activated$.complete();
  }
}

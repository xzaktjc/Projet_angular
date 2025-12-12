import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subject, fromEvent, merge, Observable } from 'rxjs';
import { filter, mapTo, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-room-service',
  templateUrl: './room-service.component.html',
  styleUrls: ['./room-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomServiceComponent implements AfterViewInit, OnDestroy {
  @Input() name: string = 'Room Service';
  @Input() imageUrl?: string;
  @Input() route: string = '/room-service';

  @ViewChild('btn', { static: true, read: ElementRef }) button!: ElementRef<HTMLButtonElement>;

  private readonly destroy$ = new Subject<void>();
  private readonly _activated$ = new Subject<void>();
  public readonly activated$: Observable<void> = this._activated$.asObservable();

    /** Méthode appelée si l'image ne charge pas */
  onImageError(): void {
    this.imageUrl = undefined; // remplace par fallback
  }

  ngAfterViewInit(): void {
    const clicks$ = fromEvent(this.button.nativeElement, 'click').pipe(mapTo(undefined));
    const keydowns$ = fromEvent<KeyboardEvent>(this.button.nativeElement, 'keydown').pipe(
      filter(ev => ev.key === 'Enter' || ev.key === ' '),
      tap(ev => ev.preventDefault()),
      mapTo(undefined)
    );

    merge(clicks$, keydowns$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this._activated$.next());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this._activated$.complete();
  }
}

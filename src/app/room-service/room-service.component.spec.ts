// room-service.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomServiceComponent } from './room-service.component';
import { RouterTestingModule } from '@angular/router/testing';
import { firstValueFrom } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RoomServiceComponent minimal', () => {
  let component: RoomServiceComponent;
  let fixture: ComponentFixture<RoomServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomServiceComponent],
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit activated$ on click', async () => {
    const btn = fixture.debugElement.query(By.css('.room-service')).nativeElement as HTMLButtonElement;

    // Clique sur le bouton
    btn.click();

    // Attend la première émission
    await firstValueFrom(component.activated$);

    // Test réussi si l'observable a émis
    expect(true).toBe(true);
  });
});

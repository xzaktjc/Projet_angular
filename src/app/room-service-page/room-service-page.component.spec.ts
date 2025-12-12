import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomServicePageComponent } from './room-service-page.component';

describe('RoomServicePageComponent', () => {
  let component: RoomServicePageComponent;
  let fixture: ComponentFixture<RoomServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomServicePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomServicePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

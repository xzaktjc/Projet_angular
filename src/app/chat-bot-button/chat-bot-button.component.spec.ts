import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotButtonComponent } from './chat-bot-button.component';

describe('ChatBotButtonComponent', () => {
  let component: ChatBotButtonComponent;
  let fixture: ComponentFixture<ChatBotButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBotButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiQuizAnswerItemComponent } from './ui-quiz-answer-item.component';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('UiQuizAnswerItemComponent', () => {
  let component: UiQuizAnswerItemComponent;
  let fixture: ComponentFixture<UiQuizAnswerItemComponent>;
  let componentRef: ComponentRef<UiQuizAnswerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiQuizAnswerItemComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(UiQuizAnswerItemComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('answer', { label: 1, isCorrect: true });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

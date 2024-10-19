import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiQuizAnswerItemComponent } from './ui-quiz-answer-item.component';
import { ComponentRef } from '@angular/core';

describe('UiQuizAnswerItemComponent', () => {
  let component: UiQuizAnswerItemComponent;
  let fixture: ComponentFixture<UiQuizAnswerItemComponent>;
  let componentRef: ComponentRef<UiQuizAnswerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiQuizAnswerItemComponent],
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

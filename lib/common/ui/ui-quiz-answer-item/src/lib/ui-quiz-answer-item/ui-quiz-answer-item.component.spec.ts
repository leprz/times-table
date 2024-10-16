import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiQuizAnswerItemComponent } from './ui-quiz-answer-item.component';

describe('UiQuizAnswerItemComponent', () => {
  let component: UiQuizAnswerItemComponent;
  let fixture: ComponentFixture<UiQuizAnswerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiQuizAnswerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiQuizAnswerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

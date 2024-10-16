import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiKeyboardComponent } from './ui-keyboard.component';

describe('UiKeyboardComponent', () => {
  let component: UiKeyboardComponent;
  let fixture: ComponentFixture<UiKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiKeyboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

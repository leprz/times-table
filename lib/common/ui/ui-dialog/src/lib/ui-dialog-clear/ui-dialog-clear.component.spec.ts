import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDialogClearComponent } from './ui-dialog-clear.component';

describe('UiDialogComponent', () => {
  let component: UiDialogClearComponent;
  let fixture: ComponentFixture<UiDialogClearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiDialogClearComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDialogClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

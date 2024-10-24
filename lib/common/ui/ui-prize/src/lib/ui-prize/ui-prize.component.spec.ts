import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPrizeComponent } from './ui-prize.component';

describe('UiPrizeComponent', () => {
  let component: UiPrizeComponent;
  let fixture: ComponentFixture<UiPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPrizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureCoinsComponent } from './feature-coins.component';

describe('FeatureCoinsComponent', () => {
  let component: FeatureCoinsComponent;
  let fixture: ComponentFixture<FeatureCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCoinsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate achieved points since last reward', () => {
    component.coins.set(200);
    const highestReward = 200;
    expect(
      component.calculateAchievedPointsSinceLastReward(highestReward),
    ).toEqual(0);

    component.coins.set(300);
    expect(
      component.calculateAchievedPointsSinceLastReward(highestReward),
    ).toEqual(100);
  });

  it('should show error when coins are less than highest reward', () => {
    component.coins.set(100);
    const highestReward = 200;
    expect(() =>
      component.calculateAchievedPointsSinceLastReward(highestReward),
    ).toThrow();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageRewardsNextAchievementProgressBarComponent } from './next-achievement-progress-bar.component';

describe('pageRewardsNextAchievementProgressBarComponent', () => {
  let component: PageRewardsNextAchievementProgressBarComponent;
  let fixture: ComponentFixture<PageRewardsNextAchievementProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRewardsNextAchievementProgressBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      PageRewardsNextAchievementProgressBarComponent,
    );
    component = fixture.componentInstance;
  });

  it('should show the progress from last achieved reward until next prize required points', () => {
    fixture.componentRef.setInput('highestReward', 200);
    fixture.componentRef.setInput('coins', 300);
    fixture.componentRef.setInput('nextPrizeRequiredPoints', 500);
    fixture.detectChanges();
    expect(component.current()).toBe(100);
    expect(component.max()).toBe(300);
  });

  it('should show the progress from 0 to next prize required points', () => {
    fixture.componentRef.setInput('highestReward', 0);
    fixture.componentRef.setInput('coins', 300);
    fixture.componentRef.setInput('nextPrizeRequiredPoints', 500);
    fixture.detectChanges();
    expect(component.current()).toBe(300);
    expect(component.max()).toBe(500);
  });
});

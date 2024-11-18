import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { FeaturePrizeSearchComponent } from './feature-prize-search.component';
import {
  GetOneNextPrizeResult,
  PrizeDataServicePort,
} from '@org/contract-prize';

describe('FeaturePrizeSearchComponent', () => {
  let component: FeaturePrizeSearchComponent;
  let fixture: ComponentFixture<FeaturePrizeSearchComponent>;
  let nextPrizeSubject: BehaviorSubject<GetOneNextPrizeResult>;

  beforeEach(async () => {
    nextPrizeSubject = new BehaviorSubject<GetOneNextPrizeResult>(null);

    await TestBed.configureTestingModule({
      imports: [FeaturePrizeSearchComponent],
    })
      .overrideProvider(PrizeDataServicePort, {
        useValue: {
          findNextPrize: () => nextPrizeSubject,
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FeaturePrizeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('calculatePointsToNextPrize', () => {
    it('should calculate difference between highest reward and collected coins', () => {
      nextPrizeSubject.next({
        requiredPoints: 200,
        name: 'Prize 1',
        isAchieved: false,
        id: '1',
      });
      const highestReward = 200;
      component.loadAction.next({ collectedPoints: 111 });

      expect(component.calculatePointsToNextPrize(highestReward)).toEqual(0);

      nextPrizeSubject.next({
        requiredPoints: 300,
        name: 'Prize 2',
        isAchieved: false,
        id: '2',
      });
      component.loadAction.next({ collectedPoints: 111 });

      expect(component.calculatePointsToNextPrize(highestReward)).toEqual(100);
    });

    it('should return 0 when next prize is already achieved', () => {
      const highestReward = 200;
      nextPrizeSubject.next({
        requiredPoints: 150,
        name: 'Prize 3',
        isAchieved: false,
        id: '3',
      });

      component.loadAction.next({ collectedPoints: 111 });

      expect(component.calculatePointsToNextPrize(highestReward)).toEqual(0);
    });
  });
});

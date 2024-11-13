import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageRewardsComponent } from './page-rewards.component';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';

describe('PageRewardsComponent', () => {
  let component: PageRewardsComponent;
  let fixture: ComponentFixture<PageRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRewardsComponent],
      providers: [provideLocationMocks(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PageRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

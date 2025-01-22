import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLearnByColoringComponent } from './page-learn-by-coloring.component';

describe('PageLearnByColoringComponent', () => {
  let component: PageLearnByColoringComponent;
  let fixture: ComponentFixture<PageLearnByColoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLearnByColoringComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageLearnByColoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

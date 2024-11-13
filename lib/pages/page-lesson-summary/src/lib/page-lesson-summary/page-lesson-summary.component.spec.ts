import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLessonSummaryComponent } from './page-lesson-summary.component';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';

describe('PageLessonSummaryComponent', () => {
  let component: PageLessonSummaryComponent;
  let fixture: ComponentFixture<PageLessonSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLessonSummaryComponent],
      providers: [provideLocationMocks(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PageLessonSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

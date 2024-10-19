import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLessonSelectorComponent } from './page-lesson-selector.component';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';

describe('PageLessonSelectorComponent', () => {
  let component: PageLessonSelectorComponent;
  let fixture: ComponentFixture<PageLessonSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLessonSelectorComponent],
      providers: [provideLocationMocks(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PageLessonSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

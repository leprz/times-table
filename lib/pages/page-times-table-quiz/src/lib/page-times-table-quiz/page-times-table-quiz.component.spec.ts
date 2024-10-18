import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTimesTableQuizComponent } from './page-times-table-quiz.component';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';

describe('PageTimesTableQuizComponent', () => {
  let component: PageTimesTableQuizComponent;
  let fixture: ComponentFixture<PageTimesTableQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTimesTableQuizComponent],
      providers: [provideLocationMocks(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTimesTableQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTimesTableQuizComponent } from './page-times-table-quiz.component';

describe('PageTimesTableQuizComponent', () => {
  let component: PageTimesTableQuizComponent;
  let fixture: ComponentFixture<PageTimesTableQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTimesTableQuizComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTimesTableQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

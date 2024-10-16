import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTimesTableGuesserComponent } from './page-times-table-guesser.component';

describe('PageCountComponent', () => {
  let component: PageTimesTableGuesserComponent;
  let fixture: ComponentFixture<PageTimesTableGuesserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTimesTableGuesserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTimesTableGuesserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

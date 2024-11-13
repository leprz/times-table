import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTimesTableGuesserComponent } from './page-times-table-guesser.component';
import { equationGeneratorMultiplicationProviders } from '@org/feature-times-table';

describe('PageCountComponent', () => {
  let component: PageTimesTableGuesserComponent;
  let fixture: ComponentFixture<PageTimesTableGuesserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTimesTableGuesserComponent],
      providers: [...equationGeneratorMultiplicationProviders],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTimesTableGuesserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

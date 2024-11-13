import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageCommonTopBarComponent } from './page-common-top-bar.component';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';

describe('TopBarComponent', () => {
  let component: PageCommonTopBarComponent;
  let fixture: ComponentFixture<PageCommonTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCommonTopBarComponent],
      providers: [provideLocationMocks(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PageCommonTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

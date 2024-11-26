import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComplexOperationComponent } from './page-complex-operation.component';

describe('PageComplexOperationComponent', () => {
  let component: PageComplexOperationComponent;
  let fixture: ComponentFixture<PageComplexOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageComplexOperationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComplexOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

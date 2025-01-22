import { TestBed } from '@angular/core/testing';
import { TinyLearnersAppComponent } from './tiny-learners-app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TinyLearnersAppComponent,
        NxWelcomeComponent,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TinyLearnersAppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome tiny-learners',
    );
  });

  it(`should have as title 'tiny-learners'`, () => {
    const fixture = TestBed.createComponent(TinyLearnersAppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tiny-learners');
  });
});

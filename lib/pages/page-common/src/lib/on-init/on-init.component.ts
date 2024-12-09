import { AfterViewInit, Component, output } from '@angular/core';

@Component({
  selector: 'page-common-on-init',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class OnInitComponent implements AfterViewInit {
  afterInit = output<void>();
  ngAfterViewInit(): void {
    this.afterInit.emit();
  }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'page-common-route-params-component',
  template: ``,
})
export class PageCommonRouteParamsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly queryParams = this.activatedRoute.snapshot.queryParams;
  public readonly params = this.activatedRoute.snapshot.params;
}

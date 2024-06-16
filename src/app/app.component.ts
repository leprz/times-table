import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MultiplicationTableComponent } from '@org/multiplication-table';

@Component({
  standalone: true,
  imports: [RouterModule, MultiplicationTableComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'org';
}
